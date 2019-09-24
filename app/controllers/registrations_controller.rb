class RegistrationsController < ApplicationController

  def index
  end

  def create
    user = User.create!(
      email: params[:email],
      password: params[:password],
      name: params[:name],
      sex: params[:sex],
      address: params[:address]
    )
    if user
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: user
      }
    else
      render json: { stauts: 500 }
   end
  end
end
