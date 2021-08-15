export default `
  <div class="chat-page" on:click={{}}>
  <aside class="chat-list">
    <div class="chat-list__search">
      <div class="chat-list-search__avatar" on:click={{toggleMainMenu}}>
      {{userAvatar}}
      </div>
      <div class="chat-list__menu hide" on:click={{toggleMainMenu}}>
        <a href="/user" class="list-menu__item">Профиль пользователя</a>
        <div class="list-menu__item" on:click={{createChat}}>Создать чат</div>
        <div class="list-menu__item" on:click={{logout}}>Выйти</div>
      </div>
      <div class="chat-list-search__field">
        <i class="search-icon"></i>
        <input type="text" placeholder="Поиск" class="chat-list-search__input" on:change={{handleSearchUser}}>
          {{findUsers}}
      </div>
    </div>
    <ul class="chat-list__items">
    {{chatsLayout}}
    </ul>
  </aside>
  <main class="chat-window">
    <header class="chat-header">
      <div class="chat-header__avatar"></div>
      <div class="chat-header__name">{{activeChatTitle}}</div>
      <i class="chat-header__menu-icon" on:click={{toggleMenu}}></i>
      <div class="chat-header__menu hide" on:click={{toggleMenu}}>
        <div class="header-menu__item" on:click={{addUsers}}>Добавить пользователя</div>
        <div class="header-menu__item" on:click={{deleteUsers}}>Удалить пользователя</div>
        <div class="header-menu__item" on:click={{deleteChat}}>Удалить чат</div>
      </div>
    </header>
    <section class="chat-main">
      {{messagesLayout}}
      
    </section>
    <form class="send-message" on:submit={{sendMessage}}>
        <label for="attach-file" class="send-message__icons send-message__icons_attach"></label>
        <input type="file" class="hide" id="attach-file" on:change={{sendFile}}>
        <input type="text" placeholder="Сообщение" class="send-message__input" name="message">
        <button class="send-message__icons send-message__icons_send" type="submit"></button>
    </form>
  </main>
</div>
  
`;
