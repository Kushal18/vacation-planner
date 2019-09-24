class TripController < ApplicationController
  include CurrentUserConcern

  def index
    logger.debug "----------------"
    logger.debug session[:user_id]
    logger.debug "----------------"
    @user = User.find(session[:user_id])
    logger.debug @user
    @trip = @user.trips
    logger.debug @trip
    if @trip
      @trip = @trip.upcomingTrips
        render json: {
          status: :created,
          trip: @trip
        }
    end
  end

  def show
    logger.debug "show previous trips"
    logger.debug session[:user_id]
    logger.debug "----------------"
    @user = User.find(session[:user_id])
    logger.debug @user
    @previousTrips = @user.trips
    logger.debug @previousTrips
    if @previousTrips
        @previousTrips = @previousTrips.previousTrips
        render json: {
          status: :created,
          trip: @previousTrips
        }
    end
  end

  def create
    logger.debug "----------------"
    logger.debug session[:user_id]
    logger.debug "----------------"
    @user = User.find(params[:id])
    @trip = @user.trips.create!(
      name: params[:tripName],
      startDate: params[:startDate],
      endDate: params[:endDate],
      address: params[:location]
    )
    if @trip
      @trip.geocode()
      @trip.save()
      render json: {
        status: :created,
        trip: @trip
      }
    else
      render json: { stauts: 500 }
    end
  end


  private

  def trip_params
    logger.debug
    params.require(:user).permit(:tripName,:startDate,:endDate,:location)

  end
end
