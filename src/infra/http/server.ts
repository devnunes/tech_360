import { env } from '@/env'
import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import { hasZodFastifySchemaValidationErrors, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { uploadImageRoute } from './routes/upload-image';

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    })
  }
  
  // Send the error to observability tools
  
  console.error(error)
  
  return reply.status(500).send({
    message: 'Internal server error',
  })
})

server.register(fastifyCors, { origin: '*' });

server.register(uploadImageRoute)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('Server is running on port 3333');
});
