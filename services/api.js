import { sessionService } from "./sessionService";

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL || process.env.NEXT_PUBLIC_API_URL;
  }

  buildUrl(endpoint, params) {
    let url = `${this.baseURL}${endpoint}`;
    if (params && Object.keys(params).length > 0) {
      const query = new URLSearchParams(params).toString();
      url += (url.includes("?") ? "&" : "?") + query;
    }
    return url;
  }

  async request(endpoint, options = {}) {
    const { method = "GET", body, headers, params } = options;

    const url =
      method === "GET" || method === "DELETE"
        ? this.buildUrl(endpoint, body || params)
        : `${this.baseURL}${endpoint}`;

    const token = sessionService.getToken();

    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(headers || {}),
      },
      body:
        method !== "GET" && method !== "DELETE" && body
          ? JSON.stringify(body)
          : undefined,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        let errorMessage = "API Error";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // if not JSON, fallback to default
        }

        // Optional: if 401, clear token and force logout
        if (response.status === 401) {
          sessionService.removeToken();
          console.warn("Unauthorized. Token removed.");
        }

        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error; // rethrow so caller can handle
    }
  }

  get(endpoint, params, options) {
    return this.request(endpoint, {
      ...options,
      method: "GET",
      params,
    });
  }

  post(endpoint, body, options) {
    return this.request(endpoint, { ...options, method: "POST", body });
  }

  put(endpoint, body, options) {
    return this.request(endpoint, { ...options, method: "PUT", body });
  }

  delete(endpoint, params, options) {
    return this.request(endpoint, {
      ...options,
      method: "DELETE",
      params,
    });
  }
}

export const apiClient = new ApiClient();
