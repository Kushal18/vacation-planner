class User < ApplicationRecord
  has_many :trips

  has_secure_password

  validates_presence_of :email
  validates_uniqueness_of :email, {:case_sensitive => true}
  validates_presence_of :name
  validates_presence_of :password_digest

end
