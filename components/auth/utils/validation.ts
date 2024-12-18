import { SignUpFormData, SignUpFormErrors } from "@/types";

// Validates email format using a regular expression
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validates username: must be 3+ chars, only alphanumeric and underscore
export const validateUsername = (username: string) => {
  return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
};

// Validates password strength:
// - Min 8 characters
// - Must contain uppercase, lowercase, number, and special character
export const validatePassword = (password: string) => {
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
};

// Validates the entire credentials tab:
// - All required fields are filled
// - Passwords match
// - Password meets strength requirements
// - No validation errors for email/username
export const validateCredentialsTab = (formData: SignUpFormData, errors: SignUpFormErrors) => {
  const { email, username, password, confirmPassword } = formData;
  
  return email.trim() !== "" &&
    username.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword &&
    validatePassword(password) &&
    !errors.email &&
    !errors.username;
};

// Validates the personal info tab:
// - First name and last name are required and non-empty
export const validatePersonalInfoTab = (formData: SignUpFormData) => {
  const { firstName, lastName } = formData;
  return firstName.trim().length > 0 && lastName.trim().length > 0;
};

// Login validation types
export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginFormErrors {
  username: boolean;
  password: boolean;
  general: boolean | string;
}

// Validates the login form
export const validateLoginForm = (formData: LoginFormData): LoginFormErrors => {
  const errors: LoginFormErrors = {
    username: false,
    password: false,
    general: false
  };

  // Username validation
  if (!formData.username.trim()) {
    errors.username = true;
  } else if (!validateUsername(formData.username)) {
    errors.username = true;
  }

  // Password validation - for login we only check if it's empty
  if (!formData.password.trim()) {
    errors.password = true;
  }

  return errors;
};

// Helper to check if login form has errors
export const hasLoginErrors = (errors: LoginFormErrors): boolean => {
  return Object.values(errors).some(error => error === true);
};
