import axios from 'axios';

const { language, code, input, setOutputLogs, setStat } = useLiveCompiler();

export function runCode() {
  setStat('Loading...');
  axios.post(compilerUrl, { language, code, input }).then((res) => {
    if (res.data.memory && res.data.cpuTime) {
      setOutputLogs('');
      setOutputLogs(
        `Memory Used: ${res.data.memory} \nCPU Time: ${res.data.cpuTime} \n${res.data.output} `
      );
    } else {
      setOutputLogs(`${res.data.output} `);
    }
    setStatus('Run');
  });
}
