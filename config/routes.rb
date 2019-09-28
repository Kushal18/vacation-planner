Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  resources :vacations, only: [:create]
  delete :logout, to: "sessions#destroy"
  get :logged_in, to: "sessions#logged_in"
  get :allTrips, to: "vacations#index"
  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
