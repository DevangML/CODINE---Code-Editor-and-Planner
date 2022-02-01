import { render } from '@testing-library/react';
import ContactMe from '../../domain/user/pages/contactMe/ContactMe';
import { typeIntoForm, clickSubmit } from './helpers/cmEventHandlers';
import cmSelector from './helpers/cmSelector';

describe('ContactMe tests', () => {
  beforeEach(() => {
    render(<ContactMe />);
  });

  test('inputs should be initially empty', () => {
    const { nameInputElement, emailInputElement, phoneInputElement, messageInputElement } =
      cmSelector();

    expect(nameInputElement.value).toBe('');
    expect(emailInputElement.value).toBe('');
    expect(phoneInputElement.value).toBe('');
    expect(messageInputElement.value).toBe('');
  });

  test('inputs should be typeable', () => {
    const { nameInputElement, emailInputElement, phoneInputElement, messageInputElement } =
      cmSelector();

    typeIntoForm({
      name: 'testname',
      email: 'testmail@gmail.com',
      phone: '1236547895',
      message: 'Hi',
    });

    expect(nameInputElement.value).toBe('testname');
    expect(emailInputElement.value).toBe('testmail@gmail.com');
    expect(phoneInputElement.value).toBe('1236547895');
    expect(messageInputElement.value).toBe('Hi');
  });

  test('ContactMe Email Error Handling test', () => {
    const { emailInputElement, emailErrorElement, emailErrorElementAgain } = cmSelector();
    typeIntoForm({
      email: 'devangmanjramkar@gmail.com',
    });
    expect(emailInputElement.value).toBe('devangmanjramkar@gmail.com');
    expect(emailErrorElement).not.toBeInTheDocument();
    typeIntoForm({
      email: 'devangmanjramkar@gmail.com',
    });
    clickSubmit();
    expect(emailErrorElementAgain).not.toBeInTheDocument();
  });

  test('Should show no error message if every input is valid', () => {
    const { emailErrorElement } = cmSelector();

    typeIntoForm({
      name: 'testname',
      email: 'testmail@gmail.com',
      phone: '1236547895',
      message: 'Hi',
    });
    clickSubmit();

    expect(emailErrorElement).not.toBeInTheDocument;
  });
});
