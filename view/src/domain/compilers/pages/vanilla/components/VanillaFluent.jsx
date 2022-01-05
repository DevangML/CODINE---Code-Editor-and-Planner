import { useEffect } from 'react';
import pushid from 'pushid';
import { Controlled as CodeMirror } from 'react-codemirror2';
import useVanilla from '../../../hooks/useVanilla';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

const VanillaFluent = function () {
  const { compData, setCompData, iRef, runCode, syncUpdates } = useVanilla();
  const { html, css, js, id } = compData;

  const codeMirrorOptions = {
    theme: 'material',
    lineNumbers: true,
    scrollbarStyle: null,
    lineWrapping: true,
  };

  useEffect(() => {
    runCode();
    setCompData({ id: pushid() });
  }, [html, css, js, id]);

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
              onBeforeChange={(editor, data, html) => {
                setCompData({ html }, () => syncUpdates());
              }}
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
              onBeforeChange={(editor, data, css) => {
                setCompData({ css }, () => syncUpdates());
              }}
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
              onBeforeChange={(editor, data, js) => {
                setCompData({ js }, () => syncUpdates());
              }}
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
