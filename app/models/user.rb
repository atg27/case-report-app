class User < ApplicationRecord
    validates :name, presence: true, uniqueness: true
    has_secure_password
    has_many :cases
    has_many :subjects, through: :cases
end
