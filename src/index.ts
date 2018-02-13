import { events } from './events';
import { items } from './items';
import { state } from './state';

const makeUrl = url => `${url}/rest`;

export function open(url) {
  url = makeUrl(url);
  return {
    events$: events(url),
    items: items(url),
    getState: state(url)
  };
}
