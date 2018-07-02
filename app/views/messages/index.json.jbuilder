json.messages @messages.each do |message|
  json.name        message.user.name
  json.content     message.content
  json.image       message.image.url
  json.created_at  message.created_at.to_s(:datetime)
  json.id          message.id
end
