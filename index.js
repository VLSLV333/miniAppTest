import 'dotenv/config';
import ngrok from '@ngrok/ngrok';

const listener = await ngrok.connect({ 
    addr: 5173, authtoken_from_env: true , 
    domain: 'unsatirical-leonarda-bossily.ngrok-free.app'
});
console.log('ngrok lisening at:', listener.url());

process.stdin.resume();

process.on('SIGINT', async () => {
    await listener.disconnect();
    process.exit(0);
})
