// Library Imports
import React from 'react';
import DropDown from 'react-dropdown';

const Header = ({ onChangeLanguage, value, runCode, status }) => {
  const options = [
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python 3' },
    { value: 'cpp17', label: 'C/C++' },
    { value: 'dart', label: 'Dart' },
    { value: 'kotlin', label: 'Kotlin' },
  ];
  return (
    <section className="compilerHeader">
      <h2 className="compilerHeader__item-1">You Code Compiler</h2>
      <p className="compilerHeader__item-2">
        A Simplistic open-source programming IDE
      </p>
      <section className="compilerHeader__section">
        <DropDown
          onChange={onChangeLanguage}
          className="nm"
          options={options}
          value={value}
          placeholder="Select an option"
        />
        <button
          onClick={() => runCode()}
          disabled={status === 'Run' ? false : true}
          className="customButton"
        >
          {status}
        </button>
      </section>
    </section>
  );
};

export default Header;
