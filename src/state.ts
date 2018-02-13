import fetch from 'node-fetch';

export function state(url) {
  const source = `${url}/items?recursive=false`;
  return () => fetch(source, { method: 'GET' }).then(r => r.json());
}
