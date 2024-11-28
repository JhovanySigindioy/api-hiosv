import { createClient } from 'redis';

const clientCache = createClient({
    url: 'redis://localhost:6379'
});

clientCache.on('error', (err) => {
    console.error('Error de Redis:', err);
});

(
    async () => {
        try {
            await clientCache.connect();
        } catch (err) {
            console.error('Error al conectar con Redis:', err);
        }
    }
)();

export { clientCache };
