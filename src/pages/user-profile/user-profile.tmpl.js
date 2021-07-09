export default `
  <main class="user-profile">
    <header class="user-profile__wrapper">
      <div class="avatar-wrapper">
        <i class="avatar-icon"></i>
      </div>
      <h2 class="user-profile__header">Иван</h2>
    </header>

    <form class="user-profile__form ">
      <div class="user-profile__row">
        <label for="email" class="user-profile-form__label">Почта</label>
        <input type="email" id="email" name="email" placeholder="Почта" class="user-profile-form__input" value={{email}}>
      </div>
      <div class="user-profile__row">
        <label for="login" class="user-profile-form__label">Логин</label>
        <input type="text" id="login" name="login" placeholder="Логин" class="user-profile-form__input" value={{login}}>
      </div>
      <div class="user-profile__row">
        <label for="first_name" class="user-profile-form__label">Имя</label>
        <input type="text" id="first_name" name="first_name" placeholder="Имя" class="user-profile-form__input" value={{name}}>
      </div>
      <div class="user-profile__row">
        <label for="second_name" class="user-profile-form__label">Фамилия</label>
        <input type="text" id="second_name" name="second_name" placeholder="Фамилия" class="user-profile-form__input"">
      </div>
      <div class="user-profile__row">
        <label for="display_name" class="user-profile-form__label">Имя в чате</label>
        <input type="text" id="display_name" name="display_name" placeholder="Имя в чате" class="user-profile-form__input"">
      </div>
      <div class="user-profile__row">
        <label for="phone" class="user-profile-form__label">Телефон</label>
        <input type="tel" id="phone" name="phone" placeholder="Телефон" class="user-profile-form__input"">
      </div>



      <div class="user-profile__links">
        <a href="/edit-user-profile" class="user-profile__link">Изменить данные</a>
        <a href="/change-password" class="user-profile__link">Измениить пароль</a>
        <a href="/" class="user-profile__link user-profile__link_reject">Выйти</a>
      </div>
    </form>
  </main>
`;
