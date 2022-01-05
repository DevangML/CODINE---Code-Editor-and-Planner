import Dfooter from '../../../common/parts/Dfooter';
import CodeEditor from './components/CodeEditor';
import InputEditor from './components/InputEditor';
import OutputLogs from './components/OutputLogs';
import Header from './components/Header';
import useLiveCompiler from '../../hooks/useLiveCompiler';

const LiveCompiler = function () {
  const { setLanguage, setCode, setInput, input, code, language, outputLogs, stat, runCode } =
    useLiveCompiler();
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
