import { useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import useVanilla from '../../../hooks/useVanilla';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

const VanillaFluent = function () {
  const { html, setHtml, css, setCss, js, setJs, iRef, runCode } = useVanilla();

  const codeMirrorOptions = {
    theme: 'material',
    lineNumbers: true,
    scrollbarStyle: null,
    lineWrapping: true,
  };

  useEffect(() => {
    runCode();
  }, [html, css, js]);

  return (
    <section className='vanilla_fluent'>
      <main className='vanilla_fluent__main'>
        <section className='vanilla_fluent__main__section-1'>
          <section
            aria-labelledby='html'
            className='vanilla_fluent__main__section-1__sub-section-1'
          >
            <label id='html' className='editor-header'>
              HTML
            </label>
            <CodeMirror
              value={html}
              options={{
                mode: 'htmlmixed',
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, html) => {
                setHtml(html);
              }}
            />
          </section>
          <section aria-labelledby='css' className='vanilla_fluent__main__section-1__sub-section-2'>
            <label id='css' className='editor-header'>
              CSS
            </label>
            <CodeMirror
              value={css}
              options={{
                mode: 'css',
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, css) => {
                setCss(css);
              }}
            />
          </section>
          <section aria-labelledby='js' className='vanilla_fluent__main__section-1__sub-section-3'>
            <label id='js' className='editor-header'>
              JS
            </label>
            <CodeMirror
              value={js}
              options={{
                mode: 'javascript',
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, js) => {
                setJs(js);
              }}
            />
          </section>
        </section>
        <section className='vanilla_fluent__main__section-2'>
          <label id='output'></label>
          <iframe className='vanilla_fluent__main__section-2__item' ref={iRef} title='foutput' />
        </section>
      </main>
    </section>
  );
};

export default VanillaFluent;
