import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Pusher from 'pusher-js';
import pushid from 'pushid';
import axios from 'axios';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

export class VanillaFluent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      html: '',
      css: '',
      js: '',
    };

    this.iRef = React.createRef();

    this.pusher = new Pusher('84c1d9e5a99706636a37', {
      cluster: 'ap2',
      forceTLS: true,
    });

    this.channel = this.pusher.subscribe('Codex');
  }

  componentDidUpdate() {
    this.runCode();
  }

  componentDidMount() {
    this.setState({
      id: pushid(),
    });

    this.channel.bind('text-update', (data) => {
      const { id } = this.state;
      if (data.id === id) return;

      this.setState({
        html: data.html,
        css: data.css,
        js: data.js,
      });
    });
  }

  syncUpdates = () => {
    const data = { ...this.state };

    axios.post('http://localhost:5000/vanilla', data);
  };

  runCode = () => {
    const { html, css, js } = this.state;

    const document = this.iRef.current.contentDocument;
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

  render() {
    const { html, js, css } = this.state;
    const codeMirrorOptions = {
      theme: 'material',
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
                value={html}
                options={{
                  mode: 'htmlmixed',
                  ...codeMirrorOptions,
                }}
                onBeforeChange={(editor, data, html) => {
                  this.setState({ html }, () => this.syncUpdates());
                }}
              />
            </section>
            <section className="vanilla_fluent__main__section-1__sub-section-2">
              <div className="editor-header">CSS</div>
              <CodeMirror
                value={css}
                options={{
                  mode: 'css',
                  ...codeMirrorOptions,
                }}
                onBeforeChange={(editor, data, css) => {
                  this.setState({ css }, () => this.syncUpdates());
                }}
              />
            </section>
            <section className="vanilla_fluent__main__section-1__sub-section-3">
              <div className="editor-header">JS</div>
              <CodeMirror
                value={js}
                options={{
                  mode: 'javascript',
                  ...codeMirrorOptions,
                }}
                onBeforeChange={(editor, data, js) => {
                  this.setState({ js }, () => this.syncUpdates());
                }}
              />
            </section>
          </section>
          <section className="vanilla_fluent__main__section-2">
            <iframe
              className="vanilla_fluent__main__section-2__item"
              ref={this.iRef}
              title="foutput"
            />
          </section>
        </main>
      </section>
    );
  }
}

export default VanillaFluent;
