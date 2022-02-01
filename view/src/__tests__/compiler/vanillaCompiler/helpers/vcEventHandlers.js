import userEvent from '@testing-library/user-event';
import vcSelector from './vcSelector';

export const typeHandler = ({ input, option, uInput }) => {
  const {} = vcSelector();

  if (input) {
    userEvent.type(inputElement, input);
  }
  if (option) {
    userEvent.selectOptions(langSelectElement, option); // ['1','3']
  }
};
