export default `
  <div class="chat-page">
  <aside class="chat-list">
    <div class="chat-list__search">
      <div class="chat-list-search__avatar"></div>
      <div class="chat-list-search__field">
        <i class="search-icon"></i>
        <input type="text" placeholder="Поиск" class="chat-list-search__input"">
      </div>
    </div>
    <ul class="chat-list__items">
      <li class="chat-list__item">
        <div class="chat-list-item__avatar">
        </div>
        <div class="chat-list-item__rows">
          <div class="chat-list-item__row">
            <div class="chat-list-item__name">
              Виктор Сикорский
            </div>
            <div class="chat-list-item__time">
              12:15
            </div>
          </div>
          <div class="chat-list-item__row">
            <div class="chat-list-item__message">
              Подтверждаю встречу сегодня в 19.00
            </div>
            <div class="chat-list-item__badge">
              16
            </div>
          </div>
        </div>
      </li>
    </ul>
  </aside>
  <main class="chat-window">
    <haeder>Header</haeder>
    <section>ChatWindow</section>
    <input type="text" name="chat-name">
  <button on:click={{createChat}}>Create chat</button>
  <button on:click={{getChats}}>Get chats</button>
  <button on:click={{deleteChat}}>Delete chat</button>
  <button on:click={{addUsers}}>Add User</button>
  <button on:click={{getChatUsers}}>Get chat users</button>
  <button on:click={{deleteUsers}}>Delete User</button>
  </main>
</div>
  
`;
