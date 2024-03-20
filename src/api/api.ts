import { RegisterData } from "./api.types.ts";

const API_URL = "http://localhost:8000/api/v1";

export async function GET<T>(url: string): Promise<T> {
  const response = await fetch(
    url.startsWith("https") ? url : `${API_URL}${url}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

async function POST(
  url: string,
  body: FormData | Record<string, unknown> = {},
) {
  const isMultipart = body instanceof FormData;
  const contentType =
    body instanceof FormData ? "multipart/form-data" : "application/json";

  const response = await fetch(`${API_URL}${url}`, {
    method: "POST",
    credentials: "include",
    body: isMultipart ? body : JSON.stringify(body, null, 2),
    headers: {
      "Content-Type": contentType,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to post data");
  }

  return response.json();
}

async function DELETE(url: string) {
  const response = await fetch(`${API_URL}${url}`, {
    credentials: "include",
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete data");
  }

  return response.json();
}

async function PUT<T>(
  url: string,
  body: Record<string, unknown> = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${url}`, {
    credentials: "include",
    method: "PUT",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to update data");
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
export const register = (data: RegisterData) => POST("/users", data);
