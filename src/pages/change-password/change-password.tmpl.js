export default `
  <main class="auth-panel auth-panel_login">
    <h1 class="auth-panel__header">Изменить пароль</h1>
    <form class="auth-form">
      <label for="oldPassword" class="auth-form__label">Введите старый пароль</label>
      <input type="text" id="oldPassword" name="oldPassword" class="auth-form__input">
      <label for="newPassword" class="auth-form__label">Введите новый пароль</label>
      <input type="text" id="newPassword" name="newPassword" class="auth-form__input">
      <label for="newPassword1" class="auth-form__label">Введите новый пароль еще раз</label>
      <input type="text" id="newPassword1" name="newPassword1" class="auth-form__input">
      <button type="submit" class="auth-form__button">Сохранить</button>
    </form>
    <a href="/user" class="auth-panel__link">Вернуться к профилю</a>
  </main>
`;
