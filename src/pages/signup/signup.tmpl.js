const per = `
  <main>
    <h1>Регистрация</h1>
    <form class="form">
      <label for="email" class="form__label">Почта</label>
      <input type="email" id="email" name="email" placeholder="Почта" class="form__input">
      <label for="login" class="form__label">Логин</label>
      <input type="text" id="login" name="login" placeholder="Логин" class="form__input">
      <label for="first_name" class="form__label">Имя</label>
      <input type="text" id="first_name" name="first_name" placeholder="Имя" class="form__input">
      <label for="second_name" class="form__label">Фамилия</label>
      <input type="text" id="second_name" name="second_name" placeholder="Фамилия" class="form__input">
      <label for="phone" class="form__label">Телефон</label>
      <input type="tel" id="phone" name="phone" placeholder="Телефон" class="form__input">
      <label for="password" class="form__label">Пароль</label>
      <input type="password" id="password" name="password" placeholder="Пароль" class="form__input">
      <label for="password2" class="form__label">Пароль (еще раз)</label>
      <input type="password" id="password2" name="password2" placeholder="Пароль (еще раз)" class="form__input">
      <button type="submit">Зарегистрироваться</button>
    </form>
    <a href="/login">Войти</a>
  </main>
`;

export default per;
