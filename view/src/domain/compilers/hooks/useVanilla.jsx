import { useRef, useState } from 'react';
import Pusher from 'pusher-js';

import { API } from '../../../api/index';

const useVanilla = () => {
  const [compData, setCompData] = useState({
    html: '',
    css: '',
    js: '',
    id: '',
  });

  const { html, css, js, id } = compData;

  const iRef = useRef();

  const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    forceTLS: true,
  });

  pusher.subscribe('Codex', (data) => {
    if (data.id === id) return;

    setCompData({ html: data.html });
    setCompData({ css: data.css });
    setCompData({ js: data.js });
  });

  const syncUpdates = () => {
    const data = { compData };

    API.post('/vanilla', data).catch(console.error);
  };

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

  return {
    compData,
    setCompData,
    syncUpdates,
    iRef,
    runCode,
  };
};

export default useVanilla;
