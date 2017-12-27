import { open } from './index';

const { events$, items } = open('http://10.0.4.1:8181');

// events$.subscribe(item => console.log('test ~>', item));

items
  .command('TestSwitch', 'ON')
  // .then(r => console.log(r))
  .catch(e => console.log(e));
