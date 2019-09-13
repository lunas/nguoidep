class CreateAds < ActiveRecord::Migration[6.0]
  def change
    create_table :ads do |t|
      t.references :page, null: false, foreign_key: true
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end
