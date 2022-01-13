import { useState } from 'react';
import styles from '../../styles/pageStyles/compiler.module.css';

const Compiler = () => {
  const [state, setState] = useState({
    input: localStorage.getItem('input') || ``,
    language_id: localStorage.getItem('language_Id') || 2,
    user_input: ``,
  });

  const { input, language_id } = state;

  const [output, setOutput] = useState(``);

  const inputChange = (event) => {
    event.preventDefault();
    setState({ input: event.target.value });
    localStorage.setItem('input', event.target.value);
  };

  const userInput = (event) => {
    event.preventDefault();
    setState({ user_input: event.target.value });
  };
  const language = (event) => {
    event.preventDefault();
    setState({ language_id: event.target.value });
    localStorage.setItem('language_Id', event.target.value);
  };

  const submit = async (e) => {
    e.preventDefault();

    setOutput('Creating Submission ...\n');
    const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions', {
      method: 'POST',
      headers: {
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'x-rapidapi-key': '7881de12dfmsh2113304271aed00p101cd9jsn038bca142e18', // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        source_code: state.input,
        stdin: state.user_input,
        language_id: state.language_id,
      }),
    });
    response && setOutput('Submission Created ...\n');
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
            'x-rapidapi-key': '7881de12dfmsh2113304271aed00p101cd9jsn038bca142e18', // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
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
        <label htmlFor='solution '>
          <span>
            <i className={styles['header']}>Code Here</i>
          </span>
        </label>
        <textarea
          required
          name='solution'
          onChange={inputChange}
          value={input}
          className={styles['input']}
        ></textarea>
        <label htmlFor='tags'>
          <b className={styles['langselect']}>Language:</b>
        </label>
        <select className={styles['lang__switch']} value={language_id} onChange={language}>
          <option className={styles['dropdown']} value='54'>
            C++
          </option>
          <option className={styles['dropdown']} value='50'>
            C
          </option>
          <option className={styles['dropdown']} value='62'>
            Java
          </option>
          <option className={styles['dropdown']} value='71'>
            Python
          </option>
        </select>
        <button type='submit' onClick={submit} className={styles['run']}>
          Run
        </button>

        <section>
          <section>
            <span>
              <i className={styles['outputheader']}>Output</i>
            </span>
            <textarea value={output} className={styles['output']}></textarea>
          </section>
        </section>
        <span>
          <i className={styles['userheader']}>User Input</i>
        </span>
        <br />
        <textarea onChange={userInput} className={styles['userinput']}></textarea>
      </section>
    </section>
  );
};

export default Compiler;
