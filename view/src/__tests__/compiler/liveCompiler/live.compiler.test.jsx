import { render, screen } from '@testing-library/react';
import Compiler from '../../../domain/compilers/pages/liveCompiler/Compiler';
import lcSelector from './helpers/lcSelector';
import { typeHandler, clickSubmit } from './helpers/lcEventHandlers';

describe('Live Compiler Tests', () => {
  beforeEach(() => {
    render(<Compiler />);
  });

  test('Presence Test', () => {
    const { inputElement, langSelectElement, runElement, outputElement, userInputElement } =
      lcSelector();

    expect(inputElement).toBeInTheDocument();
    expect(langSelectElement).toBeInTheDocument();
    expect(runElement).toBeInTheDocument();
    expect(outputElement).toBeInTheDocument();
    expect(userInputElement).toBeInTheDocument();
  });

  test.skip('Input Box Typeable Test', () => {
    const { inputElement, outputElement } = lcSelector();

    typeHandler({
      input: 'print',
      option: '71',
      uInput: 'user input',
    });

    expect(inputElement).toBe('print');
    expect(screen.queryByRole('option', { name: 'Python' }).selected).toBe(true);
    expect(outputElement).toBe('user input');
  });

  test.skip('Should show correct output test', () => {
    const { outputElement } = lcSelector();

    typeHandler({
      input: `def simple_interest(p,t,r):
    print('The principal is', p)
    print('The time period is', t)
    print('The rate of interest is',r)
      
    si = (p * t * r)/100
      
    print('The Simple Interest is', si)
    return si
      
    simple_interest(8, 6, 8)`,
      option: '71',
      uInput: '',
    });

    clickSubmit();

    expect(outputElement).not.toBe(`The principal is 8
The time period is 6
The rate of interest is 8
The Simple Interest is 3.84`);
  });
});
