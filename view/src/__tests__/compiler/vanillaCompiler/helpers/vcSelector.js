import { screen } from '@testing-library/react';

const vcSelector = () => {
  // Container section

  const normalButtonElement = screen.getByLabelText('Normal UI');
  const fluentButtonElement = screen.getByLabelText('Fluent UI');

  // Nested Components Section

  // const htmlElement = screen.getByLabelText('HTML');
  // const cssElement = screen.getByLabelText('CSS');
  // const jsElement = screen.getByLabelText('JS');
  // const vcOutputElement = screen.getByLabelText('', { selector: 'iframe' });

  return {
    normalButtonElement,
    fluentButtonElement,
    // htmlElement,
    // cssElement,
    // jsElement,
    // vcOutputElement,
  };
};

export default vcSelector;
