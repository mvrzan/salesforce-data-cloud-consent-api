import fetchProcessing from "../controllers/fetch-processing.js";
import updateProcessing from "../controllers/update-processing.js";

const processingRoute = (fastify, _options, done) => {
  fastify.route({
    method: "GET",
    url: "/processing/:id",
    handler: fetchProcessing,
  });

  fastify.route({
    method: "PATCH",
    url: "/processing/:id",
    handler: updateProcessing,
  });

  done();
};

export default processingRoute;
