class Page < ApplicationRecord
  belongs_to :issue

  has_one_attached :image
end
