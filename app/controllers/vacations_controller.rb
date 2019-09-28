class VacationsController < ApplicationController

  def index
    @user = User.find(session[:user_id])
    logger.debug @user
    @trip = @user.trips
    logger.debug @trip
    if @trip
      if(params[:trip] === "upcoming")
      @trip = @trip.upcomingVacations
        render json: {
          status: :created,
          trip: @trip
        }
      else if(params[:trip] === "previous")
        @trip = @trip.previousVacations
        render json: {
          status: :created,
          trip: @trip
        }
      end
    end
  end
end

  def create
    @user = User.find(params[:id])
    @trip = @user.trips.save(trip_params)
    if @trip
      @trip.geocode()
      @trip.save()
      render json: {
        status: :created,
        trip: @trip
      }
    else
      render json: { error: @trip.errors.full_messages }, status: :unprocessable_entity
    end
  end


  private

  def trip_params
    logger.debug
    params.require(:trip).permit(:tripName,:startDate,:endDate,:location)
  end
end
