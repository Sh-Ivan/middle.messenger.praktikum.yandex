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
      <i class="chat-header__menu"></i>
    </header>
    <section class="chat-main">
      <div class="chat-main__date">19 июня</div>
      <div class="chat-main__message chat-main__message_left">Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
        <span class="message-date">11:56</span>
      </div>
      <i class="chat-main__image chat-main__message_left"></i>      
      <div class="chat-main__message chat-main__message_right">
        Круто
        <span class="message-date">12:00</span>
      </div>
      <div class="chat-main__message chat-main__message_right">
        Круто
        <span class="message-date">12:00</span>
      </div>
      <div class="chat-main__message chat-main__message_right">
        Круто
        <span class="message-date">12:00</span>
      </div>
    </section>
    <div class="send-message">
      <i class="send-message__icons send-message__icons_attach"></i>
      <input type="text" placeholder="Сообщение" class="send-message__input">
      <i class="send-message__icons  send-message__icons_send"></i>
    </div>
    <div style="display: none">
  <button on:click={{createChat}}>Create chat</button>
  <button on:click={{getChats}}>Get chats</button>
  <button on:click={{getToken}}>Get token</button>
  <button on:click={{deleteChat}}>Delete chat</button>
  <button on:click={{addUsers}}>Add User</button>
  <button on:click={{getChatUsers}}>Get chat users</button>
  <button on:click={{deleteUsers}}>Delete User</button>
  <button on:click={{selectChat}}>Select chat</button>
  <button on:click={{sendMessage}}>Send Message</button>
  </div>
  </main>
</div>
  
`;
