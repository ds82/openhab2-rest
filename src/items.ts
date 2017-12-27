import fetch from 'node-fetch';

const itemUrl = (url, item, parameter: string | boolean = false) => {
  return parameter
    ? `${url}/items/${item}/${parameter}`
    : `${url}/items/${item}`;
};

const state = url => (item, value) => {
  return fetch(itemUrl(url, item, 'state'), {
    method: value ? 'PUT' : 'GET',
    body: value ? value : undefined
  });
};

const command = url => (item, value) => {
  return fetch(itemUrl(url, item), {
    method: value ? 'POST' : 'GET',
    body: value ? value : undefined
  });
};

export function items(url) {
  return {
    state: state(url),
    command: command(url)
  };
}
