require "rails_helper"

RSpec.describe "user creates an idea", :type => :feature, :js => true do
  it "displays the new idea" do
    visit "/"

    fill_in 'title', with: 'Flight'
    fill_in 'body', with: 'Learn to fly.'
    click_on 'Create Idea'

    expect(current_path).to eq(root_path)

    expect(page).to have_content('Flight')
    expect(page).to have_content('Learn to fly.')
  end
end
