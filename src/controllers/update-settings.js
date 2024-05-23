const updateSettings = async (request, reply) => {
  try {
    const { body } = request;
    console.log("body", body);
    return reply.status(200).send({
      message: "The request to the configuration API was successful.",
      data: request.data,
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({
      message: error.message,
      data: error.stack,
    });
  }
};

export default updateSettings;
