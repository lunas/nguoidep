class Page < ApplicationRecord
  belongs_to :issue
  has_many :ads
  has_many :companies, through: :ads

  has_one_attached :image
end
