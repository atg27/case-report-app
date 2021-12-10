class CasesController < ApplicationController
    before_action :authorize #guard clause, filter

    def index
        user = User.find_by(id: session[:user_id])
        cases = user.cases
        render json: cases
    end

    def create
        user = User.find_by(id: session[:user_id])
        casecard = user.cases.create(case_params)
        if casecard.valid?
            render json: casecard, status: :created 
          else
            render json: { errors: casecard.errors.full_messages }, status: :unprocessable_entity
          end
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        casecard = user.cases.find_by(id: params[:id])
        casecard.destroy
        head :no_content
    end

    def update
        user = User.find_by(id: session[:user_id])
        casecard = user.cases.find_by(id: params[:id])
        casecard.update(case_params)
        render json: casecard
    end

    def show
        user = User.find_by(id: session[:user_id])
        casecard = user.cases.find_by(id: params[:id])
        if casecard
            render json: casecard
        else 
            render json: {error: "Not Authorized"}, status: :unauthorized
        end
    end

    private

    def case_params
        params.require(:case).permit(:title, :image, :caption)
    end

    def authorize
        return render json: {error: "Not Authorized"}, status: :unauthorized unless session.include? :user_id
    end
end
