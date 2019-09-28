class Trip < ApplicationRecord
  belongs_to :user
  geocoded_by :address

  validates_presence_of :name
  validates_length_of :name, :maximum => 255
  validates_presence_of :startDate
  validates_presence_of :endDate
  validates_presence_of :address

  scope:upcomingVacations, lambda {where(startDate: Date.today..Date.today + 1.year)}
  scope:previousVacations, lambda {where(endDate: Date.today - 1.year..Date.today)}

end
