import { events } from './events';
import { items } from './items';
import { state } from './state';

const makeUrl = url => `${url}/rest`;

export function open(url) {
  const fullUrl = makeUrl(url);
  return {
    events$: events(fullUrl),
    items: items(fullUrl),
    getState: state(fullUrl)
  };
}
