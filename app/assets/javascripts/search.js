$(function() {
  var search_list = $('#user-search-result');
  function addUser(user) {
    var html =`
                <div class='chat-group-user clearfix'>
                  <p class='chat-group-user__name'>
                    ${user.name}
                  </p>
                  <a class='user-search-add chat-group-user__btn chat-group-user__btn--add' data-user-id="${user.id}" data-user-name="${user. name}">追加
                  </a>
                </div>
              `
              search_list.append(html);
  }
  function deleteUser(id,name) {
    var html =`
                <div class='chat-group-user clearfix js-chat-member' id='${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>
              `
    return html
  }

  function noUser(user) {
    var html =`
                <li>
                  <div class='chat-group-user clearfix'>
                </li>
              `
    search_list.append(html);
  }

  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val();
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
          noUser("該当するユーザーが見つかりません");
      }
    })
    .fail(function() {
      alert('failed')
    })
  });

  $('#user-search-result').on('click', '.user-search-add', function() {
    var id = $(this).data('user-id')
    var name = $(this).data('user-name')
    var html = deleteUser(id,name)
    $('#chat-group-users').append(html);
    $(this).parent().remove();
  });

  $('#chat-group-users').on('click','.user-search-remove',function(){
    $(this).parent().remove();
  });
});
