export default `
  <label for="email" class="user-profile-form__label">Почта</label>
  <input type="email" id="email" name="email" placeholder="Почта" class="user-profile-form__input"
  value={{email}} on:focus={{handleFocus}} on:blur={{handleBlur}}>
`;
