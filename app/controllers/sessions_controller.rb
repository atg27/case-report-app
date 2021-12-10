class SessionsController < ApplicationController
    def create #login
        user = User.find_by(name: params[:name])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id #login, setting user_id into session hash/cookie
            render json: user, status: :created
        else 
            render json: {errors: ["Invalid Username or Password"]}, status: :unauthorized
        end
    end

    def destroy #logout
        session.delete :user_id
        head :no_content
    end
end
