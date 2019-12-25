Rails.application.routes.draw do

  root 'issues#index'

  resources :issues

  namespace :api do
    resources :issues do
      resources :pages, shallow: true
    end
  end

  devise_for :admin_users, ActiveAdmin::Devise.config

  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
