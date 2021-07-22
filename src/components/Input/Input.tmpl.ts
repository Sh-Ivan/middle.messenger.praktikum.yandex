export default `
  <div class="{{wrapperClass}}">
    <label for="{{inputName}}" class="{{labelClass}}">{{labelText}}</label>
    <input type="{{inputName}}" id="{{inputName}}" name="{{inputName}}" placeholder="{{placeholder}}" class="{{inputClass}}"
    value={{value}} on:focus={{handleFocus}} on:blur={{handleBlur}}>
  </div>
  <span class="input-error hide" data-error="{{inputName}}"></span>
`;
