export const updateApiSettings = async (data) => {
  try {
    const response = await fetch(
      `${window.location.origin}/api/v1/configuration`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) throw new Error(response.statusText);

    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
