import React, { useState } from 'react';
import axios from 'axios';
import Dfooter from 'pages/generalComponents/Dfooter';
import CodeEditor from './components/CodeEditor';
import InputEditor from './components/InputEditor';
import OutputLogs from './components/OutputLogs';
import Header from './components/Header';

const LiveCompiler = function() {
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [outputLogs, setOutputLogs] = useState('');
  const [status, setStatus] = useState('Run');

  // run button callback
  const url = 'http://localhost:5000/compiler/runCode';

  const runCode = () => {
    setStatus('Loading...');
    axios.post(url, { language, code, input }).then((res) => {
      if (res.data.memory && res.data.cpuTime) {
        setOutputLogs('');
        setOutputLogs(
          `Memory Used: ${res.data.memory} \nCPU Time: ${res.data.cpuTime} \n${res.data.output} `,
        );
      } else {
        setOutputLogs(`${res.data.output} `);
      }
      setStatus('Run');
    });
  };
  return (
    <section className="liveCompiler">
      {' '}
      <Header
        value={language}
        status={status}
        runCode={() => runCode()}
        onChangeLanguage={({ value }) => setLanguage(value)}
      />
      <section className="editorContainer">
        <CodeEditor
          value={code}
          onCodeChange={(text) => setCode(text)}
          programmingLanguage={language}
        />
        <section className="optionSegment">
          <InputEditor value={input} onInputChange={(text) => setInput(text)} />
          <OutputLogs value={outputLogs} />
        </section>
      </section>
      <Dfooter />
    </section>
  );
}

export default LiveCompiler;
