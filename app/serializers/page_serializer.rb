class PageSerializer < ActiveModel::Serializer
  attributes :id, :title, :page_nr, :url
end