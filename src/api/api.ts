import { ProjectCreateData, ProjectData, RegisterData } from "./api.types.ts";

const API_URL = "http://localhost:8000/api/v1";

export async function GET<T>(url: string): Promise<T> {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}${url}`, {
    method: "GET",
    headers: { Authorization: token ? JSON.parse(token) : "" },
  });

  if (!response.ok) {
    const parsed = await response.json();

    if (parsed.detail === "Not authenticated") {
      await refreshToken();
    }

    throw new Error(parsed[0]?.messages?.[0].message || parsed.message);
  }

  return response.json();
}

async function POST(
  url: string,
  body: FormData | Record<string, unknown> = {},
) {
  const token = localStorage.getItem("access_token");
  const isMultipart = body instanceof FormData;
  const jsonHeaders = {
    Authorization: token ? JSON.parse(token) : "",
    "Content-Type": "application/json",
  };
  const multipartHeaders = {
    Authorization: token ? JSON.parse(token) : "",
  };

  const response = await fetch(`${API_URL}${url}`, {
    method: "POST",
    body: isMultipart ? body : JSON.stringify(body, null, 2),
    headers: isMultipart ? multipartHeaders : jsonHeaders,
  });

  if (!response.ok) {
    const parsed = await response.json();

    if (parsed.detail === "Not authenticated") {
      await refreshToken();
    }

    throw new Error(parsed[0]?.messages?.[0].message || parsed.message);
  }

  return response.json();
}

async function DELETE(url: string) {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}${url}`, {
    method: "DELETE",
    headers: { Authorization: token ? JSON.parse(token) : "" },
  });

  if (!response.ok) {
    const parsed = await response.json();

    if (parsed.detail === "Not authenticated") {
      await refreshToken();
    }

    throw new Error(parsed[0]?.messages?.[0].message || parsed.message);
  }

  return response.json();
}

async function PUT<T>(
  url: string,
  body: Record<string, unknown> = {},
): Promise<T> {
  const token = localStorage.getItem("access_token");

  const jsonHeaders = {
    Authorization: token ? JSON.parse(token) : "",
    "Content-Type": "application/json",
  };

  const response = await fetch(`${API_URL}${url}`, {
    method: "PUT",
    body: JSON.stringify(body, null, 2),
    headers: jsonHeaders,
  });

  if (!response.ok) {
    const parsed = await response.json();

    if (parsed.detail === "Not authenticated") {
      await refreshToken();
    }
    throw new Error(parsed[0]?.messages?.[0].message || parsed.message);
  }

  return response.json();
}

const loginAsFormData = (username: string, password: string) => {
  const formData = new FormData();

  formData.append("username", username);
  formData.append("password", password);

  return formData;
};

export const login = (username: string, password: string) =>
  POST("/auth/login", loginAsFormData(username, password));

export const refreshToken = () => POST("/auth/refresh-token");
export const register = (data: RegisterData) => POST("/users", data);
export const createProject = (data: ProjectCreateData) =>
  POST("/projects", data);
export const fetchProjects = () => GET<ProjectData[]>("/projects");
