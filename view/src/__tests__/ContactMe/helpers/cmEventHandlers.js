import userEvent from '@testing-library/user-event';
import cmSelector from './cmSelector';

export const typeIntoForm = ({ name, email, phone, message }) => {
  const { nameInputElement, emailInputElement, phoneInputElement, messageInputElement } =
    cmSelector();

  if (name) {
    userEvent.type(nameInputElement, name);
  }
  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (phone) {
    userEvent.type(phoneInputElement, phone);
  }
  if (message) {
    userEvent.type(messageInputElement, message);
  }
};

export const clickSubmit = () => {
  const { submitBtnElement } = cmSelector();
  userEvent.click(submitBtnElement);
};
