import userEvent from '@testing-library/user-event';
import lcSelector from './lcSelector';

export const typeHandler = ({ input, option, uInput }) => {
  const { inputElement, langSelectElement, userInputElement } = lcSelector();

  if (input) {
    userEvent.type(inputElement, input);
  }
  if (option) {
    userEvent.selectOptions(langSelectElement, option); // ['1','3']
  }
  if (uInput) {
    userEvent.type(userInputElement, uInput);
  }
};

export const clickSubmit = () => {
  const { runElement } = lcSelector();
  userEvent.click(runElement);
};
