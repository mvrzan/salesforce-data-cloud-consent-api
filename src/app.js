import dotenv from "dotenv";
import Fastify from "fastify";
import process from "process";
import nextJs from "@fastify/nextjs";
import settingsRoute from "./routes/settings-route.js";
import processingRoute from "./routes/processing-route.js";
import portabilityRoute from "./routes/portability-route.js";
import shouldForgetRoute from "./routes/should-forget-route.js";

dotenv.config();
const fastify = Fastify({ logger: true });

fastify.register(settingsRoute, { prefix: "/api/v1" });
fastify.register(processingRoute, { prefix: "/api/v1" });
fastify.register(shouldForgetRoute, { prefix: "/api/v1" });
fastify.register(portabilityRoute, { prefix: "/api/v1" });
fastify.register(nextJs).after(() => {
  fastify.next("/ConfigurationScreen");
});

const start = () => {
  try {
    fastify.listen(process.env.PORT, "0.0.0.0");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
