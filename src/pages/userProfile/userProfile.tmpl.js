const loginTemplate = `
  <form class="form">
      <label for="email" class="form__label">Почта</label>
      <input type="email" id="email" name="email" placeholder="Почта" class="form__input">

      <label for="login" class="form__label">Логин</label>
      <input type="text" id="login" name="login" placeholder="Логин" class="form__input">

      <label for="first_name" class="form__label">Имя</label>
      <input type="text" id="first_name" name="first_name" placeholder="Имя" class="form__input">

      <label for="second_name" class="form__label">Фамилия</label>
      <input type="text" id="second_name" name="second_name" placeholder="Фамилия" class="form__input">

      <label for="display_name" class="form__label">Имя в чате</label>
      <input type="text" id="display_name" name="display_name" placeholder="Имя в чате" class="form__input">

      <label for="phone" class="form__label">Телефон</label>
      <input type="tel" id="phone" name="phone" placeholder="Телефон" class="form__input">
      <button type="submit">Сохранить</button>
    </form>
    <button>Изменить данные</button>
    <button>Изменить пароль</button>
    <a href="/login">Выйти</a>
  </main>
`;

export default loginTemplate;
