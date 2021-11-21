import { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js';

const useVanilla = () => {
  const pusher = new Pusher('84c1d9e5a99706636a37', {
    cluster: 'ap2',
    forceTLS: true,
  });

  const [id, setId] = useState('');
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');

  useEffect(() => {
    const channel = pusher.subscribe('Codex');
    channel.bind('code-update', (data) => {
      if (data.id === id) return;
      setHtml(data.html);
      setCss(data.css);
      setJs(data.js);
    });
  }, [data]);

  useEffect(() => {
    setId(pushid());
  }, []);

  const iRef = useRef(null);

  return data;
};

export default useVanilla;
