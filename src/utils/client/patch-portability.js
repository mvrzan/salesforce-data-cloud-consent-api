export const patchPortability = async (email) => {
  try {
    const response = await fetch(
      `${window.location.origin}/api/v1/portability/?id=${email}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );

    if (!response.ok) {
      console.error(await response.json());

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
