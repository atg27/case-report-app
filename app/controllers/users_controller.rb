class UsersController < ApplicationController
    #for use with serializer
    # wrap_paramaters: :user, include: [:username, :email, :password, :password_confirmation] 

    def create #signup
        # byebug
          user = User.create(user_params)
          # byebug
          if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created 
          else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
          end
    end

    def show #who is logged in
        user = User.find_by(id: session[:user_id]) #guard clause
        if user
            render json: user 
        else
            render json: { error: "not authorized"}, status: :unauthorized
        end
    end 

    private


    #add .require(:user).permit use with serializer, conjunction with wrap params
    def user_params
        params.permit(:name, :password, :password_confirmation)
    end
end
