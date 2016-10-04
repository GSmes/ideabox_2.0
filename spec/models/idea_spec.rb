require 'rails_helper'

RSpec.describe Idea, type: :model do

  let(:idea) { build(:idea) }

  it "has a valid factory" do
    expect(idea).to be_valid
  end

  it "responds to the correct attributes" do
    expect(idea).to respond_to(:title)
    expect(idea).to respond_to(:body)
    expect(idea).to respond_to(:quality)
    expect(idea).to respond_to(:created_at)
    expect(idea).to respond_to(:updated_at)
  end

  it "defines the quality" do
    expect(idea).to define_enum_for(:quality).
      with([:swill, :plausible, :genius])
  end
end
