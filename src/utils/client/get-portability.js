export const getPortability = async (email) => {
  try {
    const response = await fetch(
      `${window.location.origin}/api/v1/portability/?id=${email}`
    );

    if (!response.ok) {
      throw new Error(
        `An error occurred: ${response.status} - ${response.statusText}
            The URL called was: ${response.url}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
