require "rails_helper"

RSpec.describe "user deletes an idea", :type => :feature, :js => true do
  let!(:idea1) { create(:idea) }
  let!(:idea2) { create(:idea) }

  it "deletes the selected idea" do
    idea1_css_id = "#idea-#{idea1.id.to_s}"
    idea2_css_id = "#idea-#{idea2.id.to_s}"

    visit "/"

    within("#idea-1") do
      click_on "Delete"
    end

    expect(current_path).to eq(root_path)

    expect(page).to have_content(idea2.title)
    expect(page).to have_content(idea2.body)
    expect(page).to have_css(idea2_css_id)
    
    expect(page).to_not have_content(idea1.title)
    expect(page).to_not have_content(idea1.body)
    expect(page).to_not have_css(idea1_css_id)
  end
end
