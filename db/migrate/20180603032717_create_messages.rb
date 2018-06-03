class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|

      t.string :content
      t.string :image
      t.references :user,    null: false, foreign_key: true, index: true
      t.references :group,   null: false, foreign_key: true, index: true
      t.timestamps
    end
  end
end
