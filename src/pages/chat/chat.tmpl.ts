export default `
  <div class="chat-page" on:click={{hideMenu}}>
  <aside class="chat-list">
    <div class="chat-list__search">
      <div class="chat-list-search__avatar" on:click={{toggleMainMenu}}></div>
      <div class="chat-list__menu hide" on:click={{toggleMainMenu}}>
        <a href="/user" class="list-menu__item">Просмотреть профиль</a>
        <div class="list-menu__item" on:click={{deleteUsers}}>Удалить пользователя</div>
        <div class="list-menu__item" on:click={{logout}}>Выйти</div>
      </div>
      <div class="chat-list-search__field">
        <i class="search-icon"></i>
        <input type="text" placeholder="Поиск" class="chat-list-search__input" on:input={{handleSearchUser}}>
        <ul class="list-search__users">
          {{findUsers}}
        </ul>
      </div>
    </div>
    <ul class="chat-list__items">
    {{chatsLayout}}
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
      </li><li class="chat-list__item">
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
    <header class="chat-header">
      <div class="chat-header__avatar"></div>
      <div class="chat-header__name">Виктор</div>
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
        <i class="send-message__icons send-message__icons_attach"></i>
        <input type="text" placeholder="Сообщение" class="send-message__input">
        <button class="send-message__icons send-message__icons_send" type="submit"></button>
    </form>
  </main>
</div>
  
`;
