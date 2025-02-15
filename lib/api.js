const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = async (endpoint, options, doNotParse = false) => {
  const defaultOptions = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...options,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, defaultOptions);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }
    if (!doNotParse) return response.json();
    return response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default api;
