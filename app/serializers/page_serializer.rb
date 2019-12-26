class PageSerializer < ActiveModel::Serializer
  attributes :id, :title, :page_nr, :image_url

  def image_url
    Rails.application.routes.url_helpers.rails_blob_path(
      self.object.image,
      only_path: true
    )
  end
end