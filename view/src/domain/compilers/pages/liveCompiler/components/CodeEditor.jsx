import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

const CodeEditor = function ({ value, onCodeChange, programmingLanguage }) {
  return (
    <section className='aceEditor'>
      <AceEditor 
        className='codeEditor'
        placeholder='Code goes here'
        mode={programmingLanguage}
        theme='monokai'
        name='editor'
        onChange={onCodeChange}
        value={value}
        showPrintMargin
        showGutter
        highlightActiveLine
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </section>
  );
};

export default CodeEditor;
