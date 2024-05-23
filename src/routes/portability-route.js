import fetchPortability from "../controllers/fetch-portability.js";
import updatePortability from "../controllers/update-portability.js";

const portabilityRoute = (fastify, _options, done) => {
  fastify.route({
    method: "GET",
    url: "/portability/:id",
    handler: fetchPortability,
  });

  fastify.route({
    method: "PATCH",
    url: "/portability/:id",
    handler: updatePortability,
  });

  done();
};

export default portabilityRoute;
