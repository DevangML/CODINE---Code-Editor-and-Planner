import axios from 'axios';
import { useState } from 'react';
import Dfooter from '../../../common/parts/Dfooter';
import CodeEditor from './components/CodeEditor';
import InputEditor from './components/InputEditor';
import OutputLogs from './components/OutputLogs';
import Header from './components/Header';
import { compilerPost } from '../../../../api';

const LiveCompiler = function () {
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [outputLogs, setOutputLogs] = useState('');
  const [stat, setStat] = useState('Run');

  const runCode = () => {
    setStat('Loading...');
    compilerPost();
  };
  return (
    <section className='liveCompiler'>
      {' '}
      <Header
        value={language}
        status={stat}
        runCode={() => runCode()}
        onChangeLanguage={({ value }) => setLanguage(value)}
      />
      <section className='editorContainer'>
        <CodeEditor
          value={code}
          onCodeChange={(text) => setCode(text)}
          programmingLanguage={language}
        />
        <section className='optionSegment'>
          <InputEditor value={input} onInputChange={(text) => setInput(text)} />
          <OutputLogs value={outputLogs} />
        </section>
      </section>
      <Dfooter />
    </section>
  );
};

export default LiveCompiler;
