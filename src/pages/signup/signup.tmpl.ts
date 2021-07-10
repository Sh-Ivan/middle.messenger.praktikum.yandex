export default `
  <main class="auth-panel auth-panel_signup">
    <h1 class="auth-panel__header">Регистрация</h1>
    <form class="auth-form">
      <label for="email" class="auth-form__label">Почта</label>
      <input type="email" id="email" name="email" placeholder="Почта" class="auth-form__input"">
      <label for="login" class="auth-form__label">Логин</label>
      <input type="text" id="login" name="login" placeholder="Логин" class="auth-form__input"">
      <label for="first_name" class="auth-form__label">Имя</label>
      <input type="text" id="first_name" name="first_name" placeholder="Имя" class="auth-form__input"">
      <label for="second_name" class="auth-form__label">Фамилия</label>
      <input type="text" id="second_name" name="second_name" placeholder="Фамилия" class="auth-form__input"">
      <label for="phone" class="auth-form__label">Телефон</label>
      <input type="tel" id="phone" name="phone" placeholder="Телефон" class="auth-form__input"">
      <label for="password" class="auth-form__label">Пароль</label>
      <input type="password" id="password" name="password" placeholder="Пароль" class="auth-form__input"">
      <label for="password2" class="auth-form__label">Пароль (еще раз)</label>
      <input type="password" id="password2" name="password2" placeholder="Пароль (еще раз)" class="auth-form__input"">
      <button type="submit" class="auth-form__button">Зарегистрироваться</button>
    </form>
    <a href="/login" class="auth-panel__link">Войти</a>
  </main>
`;
