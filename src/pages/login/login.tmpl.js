export default `
  <main>
    <h1>Вход</h1>
    <form class="form">
      <label for="login" class="form__label">Логин</label>
      <input type="text" id="login" name="login" placeholder="Логин" class="form__input">
      <label for="password" lass="form__label">Пароль</label>
      <input type="password" id="password" name="password" placeholder="Пароль" class="form__input">
      <button type="submit">Авторизоваться</button>
    </form>
    <a href="/signup">Нет аккаунта?</a>
  </main>
`;
