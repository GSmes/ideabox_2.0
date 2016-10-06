class Api::V1::IdeasController < Api::ApiController
  def index
    respond_with Idea.all
  end

  def create
    respond_with Idea.create(idea_params), location: nil
  end

  def update
    idea = Idea.find(params[:id])
    respond_with idea.update(idea_params), location: nil
  end

  def destroy
    respond_with Idea.destroy(params[:id]), location: nil
  end

  private

  def idea_params
    params.permit(:id, :title, :body, :quality)
  end
end
