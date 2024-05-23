import updateSettings from "../controllers/update-settings.js";

const settingsRoute = (fastify, _options, done) => {
  fastify.route({
    method: "POST",
    url: "/configuration",
    handler: updateSettings,
  });

  done();
};

export default settingsRoute;
