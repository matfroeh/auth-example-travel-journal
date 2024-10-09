const API_URL = import.meta.env.VITE_APP_TRAVEL_JOURNAL_API_URL;
if (!API_URL)
  throw new Error("API URL is required, are you missing a .env file?");
const baseURL = `${API_URL}/auth`;

export const signUp = async (formData) => {
  const res = await fetch(`${baseURL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while signing up");
    }
    throw new Error(errorData.error);
  }
  return await res.json();
};

export const signIn = async (formData) => {
  const res = await fetch(`${baseURL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    console.log(errorData);

    if (!errorData.error) {
      throw new Error("An error occurred while signing in");
    }
    throw new Error(errorData.error);
  }
  return await res.json();
};

export const checkAuth = async () => {
  const res = await fetch(`${baseURL}/me`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while checking authentication");
    }
    throw new Error(errorData.error);
  }
  return await res.json();
};

export const logout = async () => {
  const res = await fetch(`${baseURL}/logout`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error("An error occurred while logging out");
    }
    throw new Error(errorData.error);
  }
  return await res.json();
};
