import { useState } from 'react';
import styles from '../../styles/pageStyles/compiler.module.css';

const Compiler = () => {
  const [input, setInput] = useState(localStorage.getItem('input') || ``);
  const [languageId, setLanguageId] = useState(localStorage.getItem('language_Id') || 2);
  const [user_Input, setUser_Input] = useState(``);
  const [output, setOutput] = useState(``);

  const inputChange = (event) => {
    event.preventDefault();
    setInput(event.target.value);
    localStorage.setItem('input', event.target.value);
  };

  const userInput = (event) => {
    event.preventDefault();
    setUser_Input(event.target.value);
  };

  const language = (value, selectOptionSetter) => {
    selectOptionSetter(value);
    localStorage.setItem('languageId', value);
    // handle other stuff like persisting to store etc
  };

  const submit = async (e) => {
    e.preventDefault();
    setOutput(`Creating Submission ...\n`);
    const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions', {
      method: 'POST',
      headers: {
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'x-rapidapi-key': '7881de12dfmsh2113304271aed00p101cd9jsn038bca142e18',
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        source_code: input,
        stdin: user_Input,
        language_id: languageId,
      }),
    });
    setOutput(`Submission Created ...\n`);
    const jsonResponse = await response.json();

    let jsonGetSolution = {
      status: { description: 'Queue' },
      stderr: null,
      compile_output: null,
    };

    while (
      jsonGetSolution.status.description !== 'Accepted' &&
      jsonGetSolution.stderr == null &&
      jsonGetSolution.compile_output == null
    ) {
      setOutput(
        `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`
      );
      if (jsonResponse.token) {
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

        const getSolution = await fetch(url, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'x-rapidapi-key': '7881de12dfmsh2113304271aed00p101cd9jsn038bca142e18',
            'content-type': 'application/json',
          },
        });

        jsonGetSolution = await getSolution.json();
      }
    }
    if (jsonGetSolution.stdout) {
      const output = atob(jsonGetSolution.stdout);

      setOutput(
        `Results :\n${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`
      );
    } else if (jsonGetSolution.stderr) {
      const error = atob(jsonGetSolution.stderr);

      setOutput(`\n Error :${error}`);
    } else {
      const compilation_error = atob(jsonGetSolution.compile_output);

      setOutput(`\n Error :${compilation_error}`);
    }
  };

  return (
    <section className={styles['container']}>
      <section className={styles['inner-container']}>
        <label className={styles['header']} htmlFor='solution'>
          Code Here
        </label>
        <textarea
          required
          id='solution'
          name='solution'
          onChange={inputChange}
          className={styles['input']}
        ></textarea>
        <label className={styles['langselect']} htmlFor='tags'>
          Language
        </label>
        <select
          value={languageId}
          id='tags'
          className={styles['lang__switch']}
          role='listbox'
          onChange={(e) => language(e.target.value, setLanguageId)}
        >
          <option role='option' className={styles['dropdown']} value='54'>
            C++
          </option>
          <option role='option' className={styles['dropdown']} value='50'>
            C
          </option>
          <option role='option' className={styles['dropdown']} value='62'>
            Java
          </option>
          <option role='option' className={styles['dropdown']} value='71' name='Python'>
            Python
          </option>
        </select>
        <button type='button' onClick={submit} className={styles['run']}>
          Run
        </button>
        <br />
        <section>
          <section>
            <label htmlFor='output' className={styles['outputheader']}>
              Output
            </label>
            <textarea
              value={output}
              id='output'
              className={styles['output']}
              name='output'
            ></textarea>
          </section>
        </section>
        <label className={styles['userheader']} htmlFor='user-input'>
          User Input
        </label>
        <br />
        <textarea
          onChange={userInput}
          className={styles['userinput']}
          name='user-input'
          id='user-input'
        ></textarea>
      </section>
    </section>
  );
};

export default Compiler;
