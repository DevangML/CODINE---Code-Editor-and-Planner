// Library Imports
/* eslint-disable import/no-extraneous-dependencies */
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

const InputEditor = ({ value, onInputChange }) => (
  <AceEditor
    className='inputEditor'
    placeholder='Input Parameters'
    mode='python'
    theme='monokai'
    name='input_editor'
    onChange={onInputChange}
    fontSize={14}
    value={value}
    showPrintMargin
    showGutter
    setOptions={{
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: true,
      enableSnippets: false,
      showLineNumbers: true,
      tabSize: 2,
    }}
  />
);

export default InputEditor;
