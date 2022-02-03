class Case < ApplicationRecord
  belongs_to :user
  belongs_to :subject, optional: :true
end
