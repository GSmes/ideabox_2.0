class Api::V1::IdeasController < Api::ApiController
  def index
    respond_with Idea.all
  end

  def create
    respond_with Idea.create(idea_params), location: nil
  end

  private

  def idea_params
    params.permit(:title, :body, :quality)
  end
end
