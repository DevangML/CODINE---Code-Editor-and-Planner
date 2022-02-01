import { screen } from '@testing-library/react';

const lcSelector = () => {
  const inputElement = screen.getByLabelText('Code Here');
  const langSelectElement = screen.getByRole('listbox');
  const runElement = screen.getByRole('button');
  const outputElement = screen.getByLabelText('Output');
  const userInputElement = screen.getByLabelText('User Input');

  return { inputElement, langSelectElement, runElement, outputElement, userInputElement };
};

export default lcSelector;
