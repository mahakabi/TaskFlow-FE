export const validateRegister = ({ name, email, password }) => {
  const errors = {};
  if (!name || name.trim().length < 2)
    errors.name = "Name must be at least 2 characters";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email";
  if (!password || password.length < 8)
    errors.password = "Password must be at least 8 characters";
  return errors;
};

export const validateLogin = ({ email, password }) => {
  const errors = {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email";
  if (!password) errors.password = "Password is required";
  return errors;
};
