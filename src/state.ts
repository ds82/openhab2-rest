import fetch from 'node-fetch';
import { invoker } from 'ramda';

const invokeJson = invoker(0, 'json');

export function state(url) {
  const source = `${url}/items?recursive=false`;
  return () => fetch(source, { method: 'GET' }).then(invokeJson);
}
