require "rails_helper"

RSpec.describe "user views all ideas", :type => :feature, :js => true do
  let!(:idea1) { create(:idea) }
  let!(:idea2) { create(:idea) }

  it "displays all ideas that currently exist" do
    idea1_css_id = "#idea-#{idea1.id.to_s}"
    idea2_css_id = "#idea-#{idea2.id.to_s}"

    visit "/"

    expect(current_path).to eq(root_path)

    expect(page).to have_css(idea1_css_id)
    expect(page).to have_css(idea2_css_id)
  end
end
