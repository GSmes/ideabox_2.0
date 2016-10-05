class Api::V1::IdeasController < Api::ApiController
  def index
    respond_with Idea.all
  end
end
