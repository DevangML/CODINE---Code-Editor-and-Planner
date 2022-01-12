import { useState } from 'react';
import { API } from '../../../api/index';

const useLiveCompiler = () => {
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [outputLogs, setOutputLogs] = useState('');
  const [stat, setStat] = useState('Run');

  const runCode = async () => {
    setStat('Loading...');
    await API.post('/compiler/create', { language, code, input })
      .then((res) => {
        if (res.data.memory && res.data.cpuTime) {
          setOutputLogs('');
          setOutputLogs(
            `Memory Used: ${res.data.memory} \nCPU Time: ${res.data.cpuTime} \n${res.data.output} `
          );
        } else {
          setOutputLogs(`${res.data.output} `);
        }
        setStat('Run');
      })
      .catch((err) => {
        console.log(`Live Compiler Frontend error: ${err.message}`);
      });
  };

  return {
    setLanguage,
    setCode,
    setInput,
    input,
    code,
    language,
    outputLogs,
    stat,
    runCode,
  };
};

export default useLiveCompiler;
