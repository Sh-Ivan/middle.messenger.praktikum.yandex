export default `
  <main class="user-profile">
    <h2 class="user-profile__header user-profile__header-edit">Редактировать профиль</h2>
    <div class="user-profile__edit">
      <form class="user-profile__form " on:submit={{handleSubmit}} novalidate>
        <div class="user-profile__row">
          <label for="email" class="user-profile-form__label">Почта</label>
          <input type="email" id="email" name="email" placeholder="Почта" class="user-profile-form__input"
          value={{email}} on:focus={{handleFocus}} on:blur={{handleBlur}}>
        </div>
        <span class="input-error hide" data-error="email"></span>
        <div class="user-profile__row">
          <label for="login" class="user-profile-form__label">Логин</label>
          <input type="text" id="login" name="login" placeholder="Логин" class="user-profile-form__input" 
          value={{login}} on:focus={{handleFocus}} on:blur={{handleBlur}}>
        </div>
        <span class="input-error hide" data-error="login"></span>
        <div class="user-profile__row">
          <label for="first_name" class="user-profile-form__label">Имя</label>
          <input type="text" id="first_name" name="first_name" placeholder="Имя" class="user-profile-form__input" 
          value={{first_name}} on:focus={{handleFocus}} on:blur={{handleBlur}}>
        </div>
        <span class="input-error hide" data-error="first_name"></span>
        <div class="user-profile__row">
          <label for="second_name" class="user-profile-form__label">Фамилия</label>
          <input type="text" id="second_name" name="second_name" placeholder="Фамилия" class="user-profile-form__input" 
          value={{second_name}} on:focus={{handleFocus}} on:blur={{handleBlur}}>
        </div>
        <span class="input-error hide" data-error="second_name"></span>
        <div class="user-profile__row">
          <label for="display_name" class="user-profile-form__label">Имя в чате</label>
          <input type="text" id="display_name" name="display_name" placeholder="Имя в чате" class="user-profile-form__input" 
          value={{display_name}} on:focus={{handleFocus}} on:blur={{handleBlur}}>
        </div>
        <span class="input-error hide" data-error="display_name"></span>
        <div class="user-profile__row">
          <label for="phone" class="user-profile-form__label">Телефон</label>
          <input type="tel" id="phone" name="phone" placeholder="Телефон" class="user-profile-form__input" 
          value={{phone}} on:focus={{handleFocus}} on:blur={{handleBlur}}>
        </div>
        <span class="input-error hide" data-error="phone"></span>

        <div class="user-profile__links">
          <button type="submit" class="auth-form__button auth-form__button_center">Сохранить изменения</button>
          <a href="#" on:click={{back}} class="auth-panel__link user-profile__link_reject">Назад</a>
        </div>
      </form>

      <aside class="user-profile__aside">
        <div class="avatar-wrapper">
          {{userAvatar}}
        </div>
        <input type="file" id="avatar" accept="image/*" />
        <label for="avatar"></label>
          <a href="" class="auth-panel__link" on:click={{changeAvatar}}>Загрузить новое фото</a>
          </label>
          <a href="#" class="auth-panel__link user-profile__link_reject" on:click={{deleteAvatar}}>Удалить фото</a>
      </aside>
    </div>
  </main>
`;
