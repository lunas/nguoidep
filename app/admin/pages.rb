ActiveAdmin.register Page do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # permit_params :list, :of, :attributes, :on, :model
  #
  # or
  #
  # permit_params do
  #   permitted = [:permitted, :attributes]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  #

  # belongs_to :issue

  permit_params :title, :image, :comment, :page_nr, :issue_id, :url

  form partial: 'form'

  show do
    attributes_table do
      row :issue
      row :page_nr
      row :title
      row :created_at
      row :updated_at
      row :image do |page|
        image_tag(url_for(page.image))
      end
    end
    active_admin_comments
  end

end
