const EventSource = require('eventsource');
const {
  tryCatch,
  lensProp,
  lensPath,
  view,
  mergeDeepLeft,
  prop,
  pipe,
  reduce,
  set
} = require('ramda');
const { Observable, BehaviorSubject } = require('rxjs');
import { state } from './state';

const parseJSON = tryCatch(str => JSON.parse(str), () => ({}));
const typePath = lensPath(['payload', 'type']);
const valuePath = lensPath(['payload', 'value']);
const oldValuePath = lensPath(['payload', 'oldValue']);

const CACHE = new BehaviorSubject({});

const transformEvent = e => {
  const data = parseJSON(e.data);
  data.payload = parseJSON(data.payload);
  const [_, __, name, source] = data.topic.split('/');

  return {
    name,
    source,
    state: view(valuePath, data),
    oldState: view(oldValuePath, data),
    type: view(typePath, data)
  };
};

const completeFromCache = (item: any) => {
  return pipe(prop(item.name), mergeDeepLeft(item))(CACHE.getValue());
};

const toObject = reduce((acc, item) => set(lensProp(item.name), item, acc), {});

const fillCache = url => {
  return Observable.fromPromise(state(url)())
    .map(toObject)
    .subscribe(CACHE);
};

export function events(url) {
  // @todo: it's not the best approach to fill the cache only once.
  // this could lead to unexpected behavior, if a item is changed or added while
  // this lib is running
  fillCache(url);
  const source = new EventSource(`${url}/events?type=json`);
  return Observable.fromEvent(source, 'message')
    .map(transformEvent)
    .map(completeFromCache);
}
