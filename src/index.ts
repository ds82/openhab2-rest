import { events } from './events';
import { items } from './items';

const makeUrl = url => `${url}/rest`;

export function open(url) {
  url = makeUrl(url);
  return {
    events$: events(url),
    items: items(url)
  };
}
