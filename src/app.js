import dotenv from "dotenv";
import Fastify from "fastify";
import process from "process";
import consentRoute from "./routes/consent-route.js";

dotenv.config();
const fastify = Fastify({ logger: true });

fastify.register(consentRoute, { prefix: "/api/v1" });

const start = () => {
  try {
    fastify.listen({ port: process.env.PORT || 3000, host: "localhost" });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
