import fetchProcessing from "../controllers/fetch-processing.js";

const processingRoute = (fastify, _options, done) => {
  fastify.route({
    method: "GET",
    url: "/processing/:id",
    handler: fetchProcessing,
  });

  done();
};

export default processingRoute;
