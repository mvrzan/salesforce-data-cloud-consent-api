import salesforceAuthController from "../controllers/salesforce-auth-controller.js";

const consentRoute = (fastify, _options, done) => {
  fastify.route({
    method: "GET",
    url: "/consent",
    handler: salesforceAuthController,
  });

  done();
};

export default consentRoute;
