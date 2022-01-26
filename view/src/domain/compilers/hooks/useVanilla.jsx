import { useRef, useState } from 'react';

const useVanilla = () => {
  const [html, setHtml] = useState(null);
  const [css, setCss] = useState(null);
  const [js, setJs] = useState(null);

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
    html,
    setHtml,
    css,
    setCss,
    js,
    setJs,
    iRef,
    runCode,
  };
};

export default useVanilla;
