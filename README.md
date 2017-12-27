# openhab

This node module can talk to the openhab2 REST API and receive item updates

## usage

```js
import { open } from 'openhab';

const { events$, items } = open('http://10.0.4.1:8181');

items.command('TestSwitch', 'ON').catch(e => console.log(e));
```
