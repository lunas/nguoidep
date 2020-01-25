require 'uri'
require 'csv'

# Reads old issues and pages from two csv files and creates corresponding Issue
# and Page models. The page images read from the old pages file are attached to
# their Page model.
# Creating the models includes saving them and thereby uploading the page
# pictures to the configured server (aws for env production and uploading).

class Migrator

  OldIssue = Struct.new(:id, :title, :date, :created_at)
  OldPage  = Struct.new(:issue_id, :page_nr, :image, :url, :created_at)

  COL_SEP = ';'

  def initialize(old_issues_file:, old_pages_file:, storage_service:)
    @old_issues_file = old_issues_file
    @old_pages_file = old_pages_file
    @storage_service = storage_service
    @old_pages = {}
    @errors = []
    @num_issues = @num_uploaded_pages = 0
  end

  # For each issue read from file old-issues, create an Issue; then for each
  # corresponding page found in old-pages create a Page, download the image
  # from aws, using the old-issue's url, and attach it to the Page.
  def run
    old_issues.each do |old_issue|
      issue = Issue.create(
        title: old_issue.title,
        date: old_issue.date,
        created_at: old_issue.created_at,
        updated_at: Time.now
      )
      @num_issues += 1
      old_pages_for(issue_id: old_issue.id).each do |old_page|
        begin
          page = issue.pages.create(
            title: old_page.image,
            page_nr: old_page.page_nr,
            created_at: old_page.created_at,
            updated_at: Time.now
          )
          page.image.attach(
            io: file_from(url: old_page.url),
            filename: old_page.image || get_filename(old_page.url),
            content_type: content_type_from(old_page.url),
          )
          page.save
          @num_uploaded_pages += 1
        rescue => e

          require 'pry'; binding.pry # TODO Remove!

          @errors << e.message
        end
      end
    end
  end

  def show_results
    puts "Create #{@num_issues} issues and"
    puts "uploaded #{@num_uploaded_pages} page images to #{@storage_service}"
    if @errors.empty?
      puts "  with no errors."
    else
      puts "  with #{@errors.size} upload errors:"
      @errors.each do |error|
        puts "  - #{error}"
      end
    end
  end

  # Read csv with old issues and return an OldIssue Struct instance for each line.
  def old_issues
    read_csv(@old_issues_file).map do |row|
      OldIssue.new(row['id'], row['title'], row['date'], row['created_at'])
    end
  end

  # Lazily read csv with old pages and store an OldPage struct instance for
  # each line in a hash with issue_ids as keys and an array of OldPage structs
  # as values. Return all OldPage structs found in the hash for the given
  # issue_id
  def old_pages_for(issue_id:)
    return @old_pages[issue_id] unless @old_pages.empty?

    read_csv(@old_pages_file).each_with_object(@old_pages) do |row|
      old_page = OldPage.new(
        row['issue_id'], row['page_nr'], row['image'], row['url'], row['created_at']
      )
      if @old_pages.has_key?(old_page.issue_id)
        @old_pages[old_page.issue_id] << old_page
      else
        @old_pages[old_page.issue_id] = [old_page]
      end
    end

    @old_pages[issue_id]
  end

  def read_csv(file_name)
    file = File.read(file_name)
    CSV.parse(file, headers: true, col_sep: COL_SEP)
  end

  def file_from(url:)
    URI.open(url)
  end

  def content_type_from(url)
    url =~ /uploads.*gif$/ ? 'image/gif' : 'image/jpg'
  end

  def get_filename(url)
    uri = URI.parse(url)
    File.basename(uri.path)
  end

end