// frontend/src/lib/adminApi.js
// Thin fetch wrapper around the backend API. Keeps token storage and
// header-building in one place so components stay focused on UI.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "sanskar_admin_token";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.message || `Request failed (${res.status})`);
    error.status = res.status;
    throw error;
  }
  return data;
}

// ---- Auth ----

export async function login(username, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await handleResponse(res);
  setToken(data.token);
  return data;
}

export async function verifyToken() {
  const res = await fetch(`${API_URL}/auth/verify`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export function logout() {
  clearToken();
}

// ---- Projects ----

export async function getAllProjectsAdmin() {
  const res = await fetch(`${API_URL}/projects/admin/all`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function createProject(formData) {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: authHeaders(), // no Content-Type — browser sets multipart boundary
    body: formData,
  });
  return handleResponse(res);
}

export async function updateProject(id, formData) {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: formData,
  });
  return handleResponse(res);
}

export async function deleteProject(id) {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function deleteGalleryImage(id, publicId) {
  const res = await fetch(`${API_URL}/projects/${id}/gallery/${publicId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse(res);
}

// Builds the multipart FormData a project create/update expects from
// the plain JS object the form works with internally.
export function buildProjectFormData({
  name,
  status,
  location,
  overview,
  highlights,
  order,
  isPublished,
  imageFile,
  layoutPlanFile,
  galleryFiles,
}) {
  const fd = new FormData();
  fd.append("name", name ?? "");
  fd.append("status", status ?? "Ongoing");
  fd.append("location", location ?? "");
  fd.append("overview", overview ?? "");
  fd.append("highlights", JSON.stringify(highlights ?? []));
  fd.append("order", String(order ?? 0));
  fd.append("isPublished", String(isPublished ?? true));
  if (imageFile) fd.append("image", imageFile);
  if (layoutPlanFile) fd.append("layoutPlan", layoutPlanFile);
  (galleryFiles || []).forEach((file) => fd.append("gallery", file));
  return fd;
}