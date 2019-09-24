Rails.application.routes.draw do
  get 'trip/index'
  get 'trip/create'
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  resources :trip, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  get :allTrips, to: "trip#index"
  get :previousTrips, to: "trip#show"
  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
