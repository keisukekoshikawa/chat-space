json.name        @message.user.name
json.content     @message.content
json.image       @message.image.url
json.created_at  simple_time(@message[:created_at])
json.id          @message.id
