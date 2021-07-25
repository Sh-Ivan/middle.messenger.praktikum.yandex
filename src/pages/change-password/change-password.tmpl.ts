export default `
  <main class="auth-panel auth-panel_login">
    <h1 class="auth-panel__header">Изменить пароль</h1>
    <form class="auth-form" on:submit={{handleSubmit}}>
      <label for="oldPassword" class="auth-form__label">Введите старый пароль</label>
      <input type="password" id="oldPassword" name="oldPassword" class="auth-form__input"
      on:focus={{handleFocus}} on:blur={{handleBlur}}>
      <span class="input-error hide" data-error="oldPassword"></span>
      <label for="password" class="auth-form__label">Введите новый пароль</label>
      <input type="password" id="password" name="password" class="auth-form__input"
      on:focus={{handleFocus}} on:blur={{handleBlur}}>
      <span class="input-error hide" data-error="password"></span>
      <label for="password2" class="auth-form__label">Введите новый пароль еще раз</label>
      <input type="password" id="password2" name="password2" class="auth-form__input"
      on:focus={{handleFocus}} on:blur={{handleBlur}}>
      <span class="input-error hide" data-error="password2"></span>
      {{ saveButton }}
    </form>
    <a href="/user" class="auth-panel__link">Вернуться к профилю</a>
  </main>
`;
