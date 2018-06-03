class MessagesController < ApplicationController
  def index

  end

  def create
    @message = message.new
    @message
  end

  private
  def message_params
    params.require(:message).permit(params[:current_user.id], :content)
end
