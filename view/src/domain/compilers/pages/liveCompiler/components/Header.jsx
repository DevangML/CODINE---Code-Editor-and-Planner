// Library Imports
import DropDown from 'react-dropdown';

const Header = function ({
  onChangeLanguage, value, runCode, status,
}) {
  const options = [
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python 3' },
    { value: 'cpp17', label: 'C/C++' },
    { value: 'dart', label: 'Dart' },
    { value: 'kotlin', label: 'Kotlin' },
  ];
  return (
    <section className='compilerHeader'>
      <h2 className='compilerHeader__item-1'>Live Code Editor</h2>
      <p className='compilerHeader__item-2'>A Simple Code Editor (Based on Jdoodle API)</p>
      <section className='compilerHeader__section'>
        <DropDown
          onChange={onChangeLanguage}
          className='nm'
          options={options}
          value={value}
          placeholder='Select an option'
        />
        <button onClick={() => runCode()} disabled={status !== 'Run'} className='customButton'>
          {status}
        </button>
      </section>
    </section>
  );
};

export default Header;
