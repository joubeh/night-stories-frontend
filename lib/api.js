const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = async (endpoint, options, doNotParse = false) => {
  let defaultOptions = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...options,
  };

  const auth_token = localStorage.getItem("auth_token");
  if (auth_token) {
    defaultOptions.headers.Authorization = `Bearer ${auth_token}`;
  }

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
