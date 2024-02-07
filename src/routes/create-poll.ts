import { prisma } from '../lib/prisma';
import z from 'zod';
import { FastifyInstance } from 'fastify';

export async function createPoll(app: FastifyInstance) {
  app.post('/polls', async (request, reply) => {
    const createPollBody = z.object({
      title: z.string(),
    });

    const { title } = createPollBody.parse(request.body); // Validate the request body

    const poll = await prisma.poll.create({
      data: {
        title,
      },
    });

    return reply.status(201).send({ pollId: poll.id });
  });
}

// Primeiro, criar a poll, sem options.
// const poll = await prisma.poll.create({
//   data: {
//     title,
//   },
// });

// Em seguida, utilizar um Promise.all para criar todas as options:
// await Promise.all(
//   options.map((option) => {
//     return prisma.pollOption.create({
//       data: {
//         title: option,
//         pollId: poll.id,
//       },
//     });
//   })
// );
