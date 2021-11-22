import { useEffect, useRef, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

const VanillaFluent = function () {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');

  const iRef = useRef();

  useEffect(() => {
    runCode();
  }, [html, css, js]);

  const runCode = () => {
    if (!iRef.current) return;

    const document = iRef.current.contentDocument;
    const documentContents = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
      </body>
      <script type="text/javascript">
         ${js}
      </script>
      </html>
    `;

    document.open();
    document.write(documentContents);
    document.close();
  };

  const codeMirrorOptions = {
    theme: 'material',
    lineNumbers: true,
    scrollbarStyle: null,
    lineWrapping: true,
  };

  return (
    <section className='vanilla_fluent'>
      <main className='vanilla_fluent__main'>
        <section className='vanilla_fluent__main__section-1'>
          <section className='vanilla_fluent__main__section-1__sub-section-1'>
            <div className='editor-header'>HTML</div>
            <CodeMirror
              value={html}
              options={{
                mode: 'htmlmixed',
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, html) => setHtml(html)}
            />
          </section>
          <section className='vanilla_fluent__main__section-1__sub-section-2'>
            <div className='editor-header'>CSS</div>
            <CodeMirror
              value={css}
              options={{
                mode: 'css',
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, css) => setCss(css)}
            />
          </section>
          <section className='vanilla_fluent__main__section-1__sub-section-3'>
            <div className='editor-header'>JS</div>
            <CodeMirror
              value={js}
              options={{
                mode: 'javascript',
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, js) => setJs(js)}
            />
          </section>
        </section>
        <section className='vanilla_fluent__main__section-2'>
          <iframe className='vanilla_fluent__main__section-2__item' ref={iRef} title='foutput' />
        </section>
      </main>
    </section>
  );
};

export default VanillaFluent;
