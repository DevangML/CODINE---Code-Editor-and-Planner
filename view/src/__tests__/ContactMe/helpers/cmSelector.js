import { screen } from '@testing-library/react';

const contactSelector = () => {
  const nameInputElement = screen.getByPlaceholderText('Name');
  const phoneInputElement = screen.getByPlaceholderText('Phone Number');
  const messageInputElement = screen.getByPlaceholderText('Message');
  const emailInputElement = screen.getByPlaceholderText('Email');
  const emailErrorElement = screen.queryByText(/The email you typed is invalid/i);
  const submitBtnElement = screen.getByRole('button');

  const emailErrorElementAgain = screen.queryByText(/The email you typed is invalid/i);

  return {
    emailInputElement,
    nameInputElement,
    phoneInputElement,
    messageInputElement,
    emailErrorElement,
    submitBtnElement,
    emailErrorElementAgain,
  };
};

export default contactSelector;
