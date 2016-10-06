require "rails_helper"

RSpec.describe "user edits an idea", :type => :feature, :js => true do
  let!(:idea1) { create(:idea) }
  let!(:idea2) { create(:idea) }

  xit "updates the selected idea" do
    visit "/"

    within("#idea-1") do
      find("#body-1").set('-Updated.')
    end

    expect(current_path).to eq(root_path)

    expect(page).to have_content(idea1.title)
    expect(page).to have_content('Idea Body 1-Updated.')

    expect(page).to have_content(idea2.title)
    expect(page).to have_content(idea2.body)
  end
end
