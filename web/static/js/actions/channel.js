import { Socket } from 'phoenix';

function configureChannel() {
  const socket = new Socket('/socket');
  socket.connect();

  let channel = socket.channel('lobby');

  channel.join()
    .receive('ok', resp => console.log('Messages'))
    .receive('error', resp => console.log('Failed'))
    .after(10000, () => console.log('Issue server side.'));
}
