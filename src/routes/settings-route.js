import updateSettings from "../controllers/update-settings.js";
import updateUserInfo from "../controllers/update-user-info.js";

const settingsRoute = (fastify, _options, done) => {
  fastify.route({
    method: "POST",
    url: "/configuration",
    handler: updateSettings,
  });

  fastify.route({
    method: "POST",
    url: "/configuration/update",
    handler: updateUserInfo,
  });

  done();
};

export default settingsRoute;
