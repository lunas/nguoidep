# Script to migrate issues and pages from old ndouidep to new ngouidep.
#
#           Old         New
# ---------------------------
# Issue:    title       title
#           date        date
#
# Page
#           title
#           issue_id
#           page_nr
#           image?
#           url??
#
# active_storage_attachment
#           name
#           record_type
#           record_id
#           blob_id
#
# active_storage_blob
#           id
#           key
#           filename
#           content_type
#           metadata
#           byte_size
#           checksum
#
# Scheint nicht moeglich, die URL in ActiveStorage zu definieren, d.h. man kann
# sie nicht einfach auf bestehende Pfade in s3 zeigen lassen :-(
# Daher also
# 1. von s3 Carrierwave Pfad downloaden
# 2. neue Modell (Page) Instanz erstellen und dazugehoerendes Bild uploaden:
# https://www.stefanwienert.de/blog/2018/11/05/activestorage-migrating-from-carrierwave-attachment-pointers/
#
# def migrate_attachment!(klass:, attachment_attribute:, carrierwave_uploader:, active_storage_column: attachment_attribute)
#    klass.find_each do |item|
#        next unless item.send(attachment_attribute).present?
#        attachment = item.send(attachment_attribute)
#        attachment.cache_stored_file!
#        file = attachment.sanitized_file.file
#        content_type = item.send(attachment_attribute).content_type
#        item.send(active_storage_column).attach(io: file, content_type: content_type, filename: item.attributes[attachment_attribute.to_s])
#        item.save
#    end
#end
#
#migrate_attachment!(klass: Organisation, attachment_attribute: :logo, carrierwave_uploader: LogoUploader, active_storage_column: :logo2)


  require 'dotenv/tasks'
  require 'migrator'

namespace :nguoidep do

  # desc 'Upload images from the PAGE_IMAGE_DIR to aws and create the corresponding pages on NGUOIDEP_SERVER'
  desc 'Read issue and page data, including the image urls, from csv file and create corresponding Issue and Page instances'
  task :upload => [:environment, :dotenv] do
    old_issues_file = ENV['OLD_ISSUES_FILE'] || 'db/old-issues.csv'
    old_pages_file = ENV['OLD_PAGES_FILE'] || 'db/old-pages.csv'
    storage_service = Rails.application.config.active_storage.service

    puts "Reading old issues from #{old_issues_file}"
    puts "  and old pages from '#{old_pages_file}'"
    puts "  and creating corresponding Issue and Page instances on #{storage_service}."
    migrator = Migrator.new(
      old_issues_file: old_issues_file,
      old_pages_file: old_pages_file,
      storage_service: storage_service
    )
    migrator.run
    migrator.show_results
  end

end
