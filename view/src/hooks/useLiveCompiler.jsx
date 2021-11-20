import { useState } from 'react';

const useLiveCompiler = (compilerUrl) => {
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [outputLogs, setOutputLogs] = useState('');
  const [stat, setStat] = useState('Run');
};

export default useLiveCompiler;
