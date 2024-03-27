import { UserInputType } from "@/components/login/login";

export interface errorsType {
  email: string;
  password: string;
}

export const loginFormValidation = (userInput: UserInputType) => {
  const errors: errorsType = {
    email: "",
    password: ""
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@student\.ctuet\.edu\.vn$/;

  if (!userInput.email) {
    errors.email = "Email không được trống";
  } else if (!emailRegex.test(userInput.email)) {
    errors.email = "Địa chỉ email không hợp lệ"
  }

  if (!userInput.password) {
    errors.password = "Password không được trống";
  }

  return errors;
};
