import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({
    logger: true
});

fastify.register(cors, {
    origin: false
})

const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();