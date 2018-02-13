const EventSource = require('eventsource');
const { tryCatch, lensProp, lensPath, view } = require('ramda');
const { Observable } = require('rxjs');

const parseJSON = tryCatch(str => JSON.parse(str), () => ({}));

const typePath = lensPath(['payload', 'type']);
const valuePath = lensPath(['payload', 'value']);
const oldValuePath = lensPath(['payload', 'oldValue']);

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

export function events(url) {
  const source = new EventSource(`${url}/events?type=json`);
  return Observable.fromEvent(source, 'message').map(transformEvent);
}
