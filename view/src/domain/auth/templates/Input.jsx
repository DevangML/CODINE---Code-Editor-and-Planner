const Input = function ({ name, handleChange, placeholder, autoFocus, type, handleShowPassword }) {
  return (
    <section className='form__group'>
      <input
        className='form__field'
        name={name}
        onChane={handleChange}
        required
        autoFocus={autoFocus}
        type={type}
        placeholder={placeholder}
      />
      <label htmlFor={name} className='form__label'>
        {placeholder}
      </label>
    </section>
  );
};

export default Input;
