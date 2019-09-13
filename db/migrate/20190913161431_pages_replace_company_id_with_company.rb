class PagesReplaceCompanyIdWithCompany < ActiveRecord::Migration[6.0]
  def up
    remove_column :pages, :company_id
    add_column :pages, :companies, :string
  end

  def down
    remove_column :pages, :companies
    add_column :pages, :company_id, :integer, null: false
  end
end
