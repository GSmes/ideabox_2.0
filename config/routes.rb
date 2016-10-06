Rails.application.routes.draw do
  root 'ideas#index'

  namespace 'api' do
    namespace 'v1' do
      resources :ideas, only: [:index, :create], defaults: { format: :json }
    end
  end
end
