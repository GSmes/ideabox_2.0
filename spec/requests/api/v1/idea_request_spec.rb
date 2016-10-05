require 'rails_helper'

RSpec.describe 'Ideas Endpoint', :type => :request do
  it 'should return a collection of all ideas' do
    ideas = create_list(:idea, 3)
    expected_idea_1 = ideas.first
    expected_idea_3 = ideas.last

    get '/api/v1/ideas'

    expect(response.status).to eq(200)

    parsed_response = JSON.parse(response.body)
    first_idea = parsed_response.first
    third_idea = parsed_response.last

    expect(parsed_response.count).to eq(3)
    expect(first_idea['id']).to eq(expected_idea_1.id)
    expect(first_idea['title']).to eq(expected_idea_1.title)
    expect(first_idea['body']).to eq(expected_idea_1.body)
    expect(first_idea['quality']).to eq(expected_idea_1.quality)

    expect(third_idea['id']).to eq(expected_idea_3.id)
    expect(third_idea['title']).to eq(expected_idea_3.title)
    expect(third_idea['body']).to eq(expected_idea_3.body)
    expect(third_idea['quality']).to eq(expected_idea_3.quality)
  end
end
