class CreateCases < ActiveRecord::Migration[6.1]
  def change
    create_table :cases do |t|
      t.string :title
      t.string :image
      t.string :caption
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :subject, null: false, foreign_key: true

      t.timestamps
    end
  end
end
