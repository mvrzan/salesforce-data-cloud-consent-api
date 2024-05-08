import shouldForgetConsentApiController from "../controllers/should-forget-consent-api-controller.js";

const shouldForget = (fastify, _options, done) => {
  fastify.route({
    method: "GET",
    url: "/shouldForget",
    handler: shouldForgetConsentApiController,
  });

  done();
};

export default shouldForget;
