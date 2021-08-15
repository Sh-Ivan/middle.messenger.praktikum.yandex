"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
  <main class="user-profile">
    <header class="user-profile__wrapper">
      <div class="avatar-wrapper">
        {{userAvatar}}
      </div>
      <h2 class="user-profile__header">{{fullName}}</h2>
    </header>

    <form class="user-profile__form ">
      <div class="user-profile__row">
        <label for="email" class="user-profile-form__label">Почта</label>
        <input type="email" id="email" name="email" placeholder="Почта" class="user-profile-form__input" 
        disabled value={{email}}>
      </div>
      <div class="user-profile__row">
        <label for="login" class="user-profile-form__label">Логин</label>
        <input type="text" id="login" name="login" placeholder="Логин" class="user-profile-form__input" 
        disabled value={{login}}>
      </div>
      <div class="user-profile__row">
        <label for="first_name" class="user-profile-form__label">Имя</label>
        <input type="text" id="first_name" name="first_name" placeholder="Имя" class="user-profile-form__input" 
        disabled value={{first_name}}>
      </div>
      <div class="user-profile__row">
        <label for="second_name" class="user-profile-form__label">Фамилия</label>
        <input type="text" id="second_name" name="second_name" placeholder="Фамилия" class="user-profile-form__input" 
        disabled value={{second_name}}>
      </div>
      <div class="user-profile__row">
        <label for="display_name" class="user-profile-form__label">Имя в чате</label>
        <input type="text" id="display_name" name="display_name" placeholder="Имя в чате" class="user-profile-form__input" 
        disabled value={{display_name}}>
      </div>
      <div class="user-profile__row">
        <label for="phone" class="user-profile-form__label">Телефон</label>
        <input type="tel" id="phone" name="phone" placeholder="Телефон" class="user-profile-form__input" 
        disabled value={{phone}}>
      </div>

      <div class="user-profile__links">
        <a href="/edit-user-profile" class="user-profile__link">Изменить данные</a>
        <a href="/change-password" class="user-profile__link">Изменить пароль</a>
        <a href="/login" class="user-profile__link user-profile__link_reject" on:click={{handleSignout}}>Выйти</a>
      </div>
    </form>
  </main>
`;
//# sourceMappingURL=user-profile.tmpl.js.map