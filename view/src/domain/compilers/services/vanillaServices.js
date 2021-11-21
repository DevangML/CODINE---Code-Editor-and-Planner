import axios from 'axios';

const { id, html, css, js } = useVanillaFluent;

const [data, setData] = useVanillaFluent;

export function syncUpdates() {
  setData({ id: id, html: html, css: css, js: js });

  axios.post('http://localhost:5000/vanilla', data);
}
