$(document).on("turbolinks:load", function() {
  $(function() {
    var search_list = $('#user-search-result');
    function addUser(user) {
      var html =`
                  <div class='chat-group-user clearfix'>
                    <p class='chat-group-user__name'>${user.name}</p>
                    <a class='user-search-add chat-group-user__btn js-add-btn chat-group-user__btn--add' data-user-id="${user.id}" data-user-name="${user.name}">Add</a>
                  </div>
                `
                search_list.append(html);
    }
    function appendUser(user) {
      var html =`
                  <div class='chat-group-user clearfix' id='${user.id}'>
                    <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                    <p class='chat-group-user__name'>${user.name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>delete</a>
                  </div>
                `
      return html
    }

    function noUser(message) {
      var html =`
                  <div class='chat-group-user clearfix'>
                   <p>${message}</p>
                  </div>
                `
      search_list.append(html);
    }

    $('#user-search-field').on('keyup', function() {
      var newinput = '';
      var input = $.trim($(this).val());
      if (newinput != input) {
      $.ajax({
        url: '/users',
        type: 'GET',
        data: { keyword: input },
        dataType: 'json',
      })
      .done(function(users) {
        $('#user-search-result').empty();
        if (users.length !== 0) {
            users.forEach(function(user){
            addUser(user);
            })
        } else {
            noUser('No such user was found');
        }
      })
      .fail(function() {
        alert('failed')
      })
    }
  })
    $('#user-search-result').on('click', '.js-add-btn', function() {
      var user = { id: $(this).data('userId'), name: $(this).data('userName')}
      var html = appendUser(user)
      $('#chat-group-users').append(html);
      $(this).parent().remove();
    });

    $('#chat-group-users').on('click', '.js-remove-btn', function(){
      $(this).parent().remove();
    });
  })
});
