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

  it 'should create an idea' do
    idea_params = {
      title: 'Become a superhero',
      body: 'Find radioactive material to jump into.',
      quality: 'genius'
    }

    post "/api/v1/ideas", params: idea_params

    expect(response.status).to eq(201)

    new_idea = JSON.parse(response.body, symbolize_names: :true)

    expect(new_idea[:id]).to eq(4)
    expect(new_idea[:title]).to eq('Become a superhero')
    expect(new_idea[:body]).to eq('Find radioactive material to jump into.')
    expect(new_idea[:quality]).to eq('genius')
  end

  it 'should delete an idea' do
    ideas = create_list(:idea, 2)
    deleted_idea   = ideas.first
    remaining_idea = ideas.last

    expect(Idea.where(id: deleted_idea.id, title: deleted_idea.title)).to exist
    expect(Idea.where(id: remaining_idea.id, title: remaining_idea.title)).to exist

    delete "/api/v1/ideas/#{deleted_idea.id}"

    expect(response.status).to eq(204)
    expect(Idea.where(id: deleted_idea.id, title: deleted_idea.title)).to_not exist
    expect(Idea.where(id: remaining_idea.id, title: remaining_idea.title)).to exist

    get '/api/v1/ideas'

    leftover_ideas = JSON.parse(response.body)

    expect(leftover_ideas.count).to eq(1)
  end

  it 'should update an idea' do
    ideas = create_list(:idea, 2)
    original_idea  = ideas.first
    unedited_idea = ideas.last

    expect(Idea.where(id: original_idea.id, title: original_idea.title)).to exist

    idea_params = {
      title: 'Do nothing',
      body: 'Find a couch and sit on it.',
      quality: 'genius'
    }

    put "/api/v1/ideas/#{original_idea.id}", params: idea_params

    expect(response.status).to eq(204)

    updated_idea = Idea.find(original_idea.id)

    expect(updated_idea.title).to eq('Do nothing')
    expect(updated_idea.title).to_not eq(original_idea.title)
    expect(updated_idea.body).to eq('Find a couch and sit on it.')
    expect(updated_idea.body).to_not eq(original_idea.body)
    expect(updated_idea.quality).to eq('genius')
    expect(updated_idea.quality).to_not eq(original_idea.quality)

    get '/api/v1/ideas'

    all_ideas = JSON.parse(response.body, symbolize_names: :true)

    expect(all_ideas.count).to eq(2)
    expect(all_ideas.first[:title]).to eq(unedited_idea[:title])
    expect(all_ideas.first[:body]).to eq(unedited_idea[:body])
    expect(all_ideas.first[:quality]).to eq(unedited_idea[:quality])
    expect(all_ideas.last[:title]).to eq('Do nothing')
    expect(all_ideas.last[:body]).to eq('Find a couch and sit on it.')
    expect(all_ideas.last[:quality]).to eq('genius')
  end
end
