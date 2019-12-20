ActiveAdmin.register Issue do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  permit_params :title, :date

  # works only with `belongs_to :issue` in admin/pages.rb:
  # sidebar "Issue: Pages", only: [:show, :edit] do
  #   ul do
  #     li link_to "Pages",    admin_issue_pages_path(resource)
  #   end
  # end

  form do |f|
    f.semantic_errors # shows errors on :base
    # f.inputs          # builds an input field for every attribute
    f.input :title
    f.input :date,
            as: :datepicker,
            datepicker_options: { min_date: '+10Y', max_date: '-10Y' }
    f.actions         # adds the 'Submit' and 'Cancel' buttons

    h2 "Pages for issue  '#{resource.title}'"

    table_for resource.pages do
      column "Title", :title
      column "Page",  :page_nr
      column "Image" do |page|
        image_tag page.image.variant(resize_to_limit: [100, 100])
      end
      column "Delete" do |page|
        link_to 'delete page', admin_page_path(page), method: :delete
      end
    end
  end



end
