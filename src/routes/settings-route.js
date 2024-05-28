import updateSettings from "../controllers/update-settings.js";
import updateUserDb from "../controllers/update-user-db.js";

const settingsRoute = (fastify, _options, done) => {
  fastify.route({
    method: "POST",
    url: "/configuration",
    handler: updateSettings,
  });

  fastify.route({
    method: "POST",
    url: "/configuration/update",
    handler: updateUserDb,
  });

  done();
};

export default settingsRoute;
