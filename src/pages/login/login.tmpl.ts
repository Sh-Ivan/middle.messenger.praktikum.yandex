export default `
  <main class="auth-panel auth-panel_login">
    <h1 class="auth-panel__header">Вход</h1>
    <form class="auth-form" on:submit={{handleSubmit}}>
      <label for="login" class="auth-form__label">Логин</label>
      <input type="text" id="login" name="login" placeholder="Логин" class="auth-form__input"
      on:focus={{handleFocus}} on:blur={{handleBlur}}>
      <span class="input-error hide" data-error="login"></span>
      <label for="password" class="auth-form__label">Пароль</label>
      <input type="password" id="password" name="password" placeholder="Пароль" class="auth-form__input"
      on:focus={{handleFocus}} on:blur={{handleBlur}}>
      <span class="input-error hide" data-error="password"></span>
      {{loginButton}}
    </form>
    <a href="/signup" class="auth-panel__link">Нет аккаунта?</a>
  </main>
`;
