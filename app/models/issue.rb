class Issue < ApplicationRecord
  has_many :pages, -> { order "page_nr ASC" }, dependent: :destroy
end
