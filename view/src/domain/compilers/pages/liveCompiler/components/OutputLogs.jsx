// Library Imports
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

const OutputLogs = ({ value }) => (
  <AceEditor
    className='outputLogs'
    placeholder='Output Logs'
    mode='python'
    theme='monokai'
    name='outputlogs'
    fontSize={14}
    value={value}
    showPrintMargin
    showGutter
    setOptions={{
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      enableSnippets: false,
      showLineNumbers: true,
      tabSize: 2,
    }}
  />
);

export default OutputLogs;
