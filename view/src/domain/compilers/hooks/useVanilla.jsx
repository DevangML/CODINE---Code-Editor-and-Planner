import { useRef, useState } from 'react';

const useVanilla = () => {
  const [compData, setCompData] = useState({
    html: '',
    css: '',
    js: '',
    id: '',
  });

  const { html, css, js, id } = compData;

  const iRef = useRef();

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
    iRef,
    runCode,
  };
};

export default useVanilla;
