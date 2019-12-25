module Api
  class PagesController < ApplicationController

    def index
      pages = Issue.find(params[:issue_id]).pages

        #render json: pages, each_serializer: PageSerializer, adapter: :json_api, status: 200
      render json: pages, each_serializer: PageSerializer, status: 200
    end

    private

    def issue_params
      params.require(:issue).permit(:id)
    end
  end
end