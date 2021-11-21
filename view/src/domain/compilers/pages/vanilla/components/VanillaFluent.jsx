import { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import Pusher from "pusher-js";
import pushid from "pushid";
import axios from "axios";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";

import React from 'react'


export default VanillaFluent


function VanillaFluent () {

  const pusher = new Pusher("84c1d9e5a99706636a37", {
    cluster: "ap2",
    forceTLS: true,
  });

  const channel = pusher.subscribe("Codex");

  var [id, setId] = useState('');
  var [html, setHtml] = useState('')
  var [css, setCss] = useState('');
  var [js, setJs] = useState('');

useEffect(() => {
  runCode()
}, []);

useEffect(() => {
  setId(pushid())
}, [])


  function channel("text-update", (data) => {
    const { id } = this.state;
    if (data.id === id) return;

    this.setState({
      html: data.html,
      css: data.css,
      js: data.js,
    });
  });
}

const syncUpdates = () => {
  const data = { ...this.state };

  axios.post("http://localhost:5000/vanilla", data);
};

const iRef = React.createRef();

const runCode = () => {

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
  
          <script type="text/javascript">
            ${js}
          </script>
        </body>
        </html>
      `;

  document.open();
  document.write(documentContents);
  document.close();
};

  const codeMirrorOptions = {
    theme: "material",
    lineNumbers: true,
    scrollbarStyle: null,
    lineWrapping: true,
  };
  return (
    <section className="vanilla_fluent">
      <main className="vanilla_fluent__main">
        <section className="vanilla_fluent__main__section-1">
          <section className="vanilla_fluent__main__section-1__sub-section-1">
            <div className="editor-header">HTML</div>
            <CodeMirror
              value= {html}
              options={{
                mode: "htmlmixed",
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, html) => {
                setHtml(syncUpdates());
              }}
            />
          </section>
          <section className="vanilla_fluent__main__section-1__sub-section-2">
            <div className="editor-header">CSS</div>
            <CodeMirror
              value={css}
              options={{
                mode: "css",
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, css) => {
                setCss(syncUpdates())
              }}
            />
          </section>
          <section className="vanilla_fluent__main__section-1__sub-section-3">
            <div className="editor-header">JS</div>
            <CodeMirror
              value={js}
              options={{
                mode: "javascript",
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, js) => {
                setJs(syncUpdates())
              }}
            />
          </section>
        </section>
        <section className="vanilla_fluent__main__section-2">
          <iframe
            className="vanilla_fluent__main__section-2__item"
            ref={iRef}
            title="foutput"
          />
        </section>
      </main>
    </section>
  );
            
export default VanillaFluent;
