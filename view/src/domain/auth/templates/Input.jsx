function Input({ name, handleChange, label, autoFocus, type, handleShowPassword }) {
  return (
    <section>
      <input
        name={name}
        onChane={handleChange}
        required
        label={label}
        autofocus={autoFocus}
        type={type}
        // InputProps={
        //   name === 'password' && {
        //     endAdornment: (
        //       <InputAdornment position='end'>
        //         <IconButton onClick={handleShowPassword}>
        //           {type === 'password' ? <Visibility /> : <VisibilityOff />}
        //         </IconButton>
        //       </InputAdornment>
        //     ),
        //   }
        // }
      />
    </section>
  );
}

export default Input;
