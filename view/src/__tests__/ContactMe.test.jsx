import { render, screen } from '@testing-library/react';
import ContactMe from '../domain/user/pages/contactMe/ContactMe';

test('Checking if Name field is present', () => {
  // 1) Rendering the component we want in virtual DOM
  render(<ContactMe />);

  // 2) Finding the element
  const linkElement = screen.getByPlaceholderText('Name');

  // 3) Assertion (test)
  expect(linkElement).toBeInTheDocument();
});

test('inputs should be initially empty', () => {
  render(<ContactMe />);

  const nameInputElement = screen.getByPlaceholderText('Name');
  const emailInputElement = screen.getByPlaceholderText('Email');
  const phoneInputElement = screen.getByPlaceholderText('Phone Number');
  const messageInputElement = screen.getByPlaceholderText('Message');

  expect(nameInputElement.value).toBe('');
  expect(emailInputElement.value).toBe('');
  expect(phoneInputElement.value).toBe('');
  expect(messageInputElement.value).toBe('');
});
