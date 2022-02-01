import { render, screen } from '@testing-library/react';
import Vanilla from '../../../domain/compilers/pages/vanilla/Vanilla';
import vcSelector from './helpers/vcSelector';
import { typeHandler, clickSubmit } from './helpers/vcEventHandlers';
import userEvent from '@testing-library/user-event';
import VanillaFluent from '../../../domain/compilers/pages/vanilla/components/VanillaFluent';

describe('Vanilla Compiler Container Tests', () => {
  beforeEach(() => {
    render(<Vanilla />);
  });

  test('Presence Test', () => {
    const { normalButtonElement, fluentButtonElement } = vcSelector();

    expect(normalButtonElement).toBeInTheDocument();
    expect(fluentButtonElement).toBeInTheDocument();
  });

  test('Clickable Test', () => {
    const { normalButtonElement, fluentButtonElement } = vcSelector();

    userEvent.click(normalButtonElement);
    userEvent.click(fluentButtonElement);

    expect(normalButtonElement).toBeClicked;
    expect(fluentButtonElement).toBeClicked;
  });
});

describe.skip('Vanilla Fluent Tests', () => {
  beforeEach(() => {
    render(<VanillaFluent />);
  });

  test('Presence Test', () => {
    const { htmlElement, cssElement, jsElement, vcOutputElement } = vcSelector();

    expect(htmlElement).toBeInTheDocument();
    expect(cssElement).toBeInTheDocument();
    expect(jsElement).toBeInTheDocument();
    expect(vcOutputElement).toBeInTheDocument();
  });
});
