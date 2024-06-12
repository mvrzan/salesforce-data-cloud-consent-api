import {
  createUserSettingsTable,
  updateUserSettings,
} from "../database/user-settings.js";

const updateUserDb = async (request, reply) => {
  console.log("Connecting to database...");

  try {
    // create a new table in the database if one does not exist
    await createUserSettingsTable();

    // insert data into the table
    await updateUserSettings(request.body);

    return reply.status(200).send({
      message: "User settings updated successfully!",
    });
  } catch (error) {
    console.error(error);

    reply.status(500).send(error);
  }
};

export default updateUserDb;
