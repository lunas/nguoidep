
class Page < ApplicationRecord
  belongs_to :issue

  has_one_attached :image

  before_destroy :remove_image

  def remove_image
    image.purge_later
  end

end
