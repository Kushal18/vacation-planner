class SessionsController < ApplicationController

  def create
   @user = User.find_by(email: params[:email]).try(:authenticate ,params[:password])
   if @user
     login(@user)
     render json: {
       status: :created
     }
   else
     render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
   end
  end

  def logged_in
    if current_user
      @user = current_user
      render status: 200
    else
      render status: 404
    end
  end

  def destroy
    logout
    render json: { status: 200, logged_out: true }
  end
end
