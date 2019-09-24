class CreateTrips < ActiveRecord::Migration[6.0]
  def change
    create_table :trips do |t|
      t.belongs_to :user , index: true
      t.string :name
      t.date :startDate
      t.date :endDate
      t.string :address
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
