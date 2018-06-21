$(document).on("turbolinks:load", function() {
  function buildHTML(message) {
    var img = "";
    if (message.image) {
      var img = `<img src=${message.image}>`
    }
    var html =
               `<div class = "contents__chat__message__contents--name">
                  ${message.name}
                    <div class = "contents__chat__message__contents--timestamp">
                         ${message.created_at}

                    </div>
                    <div class = "contents__chat__message__contents--messages">
                      ${message.content}
                      ${img}

                  </div>
                </div>
               `
    return html
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this)
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data) {
      var html = buildHTML(data);
      $('.contents__chat__message__contents').append(html)
      $('.contents__footer__input-form--text').val('')
      $("#new_message")[0].reset();
      $('.contents__chat__message').animate({ scrollTop: $('.contents__chat__message')[0].scrollHeight }, 500)
    })
    .fail(function() {
      alert('failed')
    })
  });
});

