$(document).on("turbolinks:load", function() {
  function buildHTML(message) {
    var img = "";
    if (message.image) {
      var img = `<img src=${message.image}>`;
    }
    var html =`
               <div class='contents__chat__message__contents--name' data-message-id="${message.id}">
                  ${message.name}
                  <div class='contents__chat__message__contents--timestamp'>
                    ${message.created_at}
                  </div>
                </div>
                <div class='contents__chat__message__contents--messages'>
                  ${message.content}
                  ${img}
                </div>
              `
    return html;
  }

  function scroll() {
    $('.contents__chat__message').animate({ scrollTop: $('.contents__chat__message')[0].scrollHeight }, 500);
  }

  var interval = setInterval(function() {
    var message_id = $('.contents__chat__message__contents--name:last').data('messageId');
    if (location.pathname.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: location.href,
        data: { id: message_id },
        dataType: "json"
      })
      .done(function(json) {
        json.new_message.forEach(function(message) {
          var html = buildHTML(message);
          $('.contents__chat__message__contents').append(html);
          scroll();
        });
      })
      .fail(function(json) {
        alert('failed');
      });
    } else {
      clearInterval(interval);
    }} , 5 * 1000 );

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.contents__chat__message__contents').append(html);
      $('#new_message')[0].reset();
      scroll();
      $('.contents__footer__input-form--button').prop('disabled', false);
    })
    .fail(function() {
      alert('failed');
    })
    return false;
  });
});
