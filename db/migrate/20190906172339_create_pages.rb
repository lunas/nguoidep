class CreatePages < ActiveRecord::Migration[6.0]
  def change
    create_table :pages do |t|
      t.string :title
      t.string :image
      t.string :comment
      t.integer :page_nr
      t.references :issue, null: false, foreign_key: true
      t.string :url

      t.timestamps
    end
  end
end
