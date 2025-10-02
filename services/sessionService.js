const TOKEN_KEY = "vadai_auth_token";
const REFRESH_TOKEN_KEY = "vadai_auth_refresh_token"; 
const USER_KEY = "vadai_id"; 
export const sessionService = {
  setSession(data) {
    try {
      if (typeof window !== "undefined") {
        // if API returns { token, user } or similar
        if (data.token) {
          localStorage.setItem(TOKEN_KEY, data.token);
        }
        if (data.refreshToken) {
          localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
        }
        if (data.Id) {
          localStorage.setItem(USER_KEY, data.Id);
        }
      }
    } catch (error) {
      console.error("Error setting session in localStorage:", error);
    }
  },

  getToken() {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem(TOKEN_KEY);
      }
      return null;
    } catch (error) {
      console.error("Error reading token from localStorage:", error);
      return null;
    }
  },


  removeSession() {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    } catch (error) {
      console.error("Error removing session from localStorage:", error);
    }
  },
};
