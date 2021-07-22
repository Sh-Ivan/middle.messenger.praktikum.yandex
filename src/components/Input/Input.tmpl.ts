export default `
  <div class="{{wrapperClass}}">
    <label for="{{inputName}}" class="{{labelClass}}">{{labelText}}</label>
    <input type="{{inputName}}" id="{{inputName}}" name="{{inputName}}" placeholder="{{placeholer}}" class="{{inputClass}}"
    value={{inputName}} on:focus={{handleFocus}} on:blur={{handleBlur}}>
  </div>
  <span class="input-error hide" data-error="{{inputName}}"></span>
`;
