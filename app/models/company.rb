class Company < ApplicationRecord
  has_many :ads
  has_many :pages, through: :ads
end
