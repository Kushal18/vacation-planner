class RegistrationsController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render json: {
        status: :created,
        user: @user
      }
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email,:password,:name,:sex,:address)
  end
end
