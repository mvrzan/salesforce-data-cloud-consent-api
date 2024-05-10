import fetchShouldForget from "../controllers/fetch-should-forget.js";
import updateShouldForget from "../controllers/update-should-forget.js";

const shouldForget = (fastify, _options, done) => {
  fastify.route({
    method: "GET",
    url: "/shouldForget/:id",
    handler: fetchShouldForget,
  });

  fastify.route({
    method: "PATCH",
    url: "/shouldForget",
    handler: updateShouldForget,
  });

  done();
};

export default shouldForget;
