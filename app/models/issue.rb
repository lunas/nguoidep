class Issue < ApplicationRecord

  default_scope { order(date: :desc, title: :asc) }

  has_many :pages, -> { order "page_nr ASC" }, dependent: :destroy
end
