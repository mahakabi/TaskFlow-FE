export const extractError = (error) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.response?.data?.errors?.length) {
    return error.response.data.errors.map((e) => e.msg).join(", ");
  }
  if (error?.message) {
    return error.message;
  }
  return "Something went wrong";
};

export const extractValidationErrors = (error) => {
  if (error?.response?.data?.errors) {
    const map = {};
    error.response.data.errors.forEach((e) => {
      map[e.path] = e.msg;
    });
    return map;
  }
  return {};
};
