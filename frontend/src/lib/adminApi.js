// frontend/src/lib/adminApi.js
// Thin fetch wrapper around the backend API. Keeps token storage and
// header-building in one place so components stay focused on UI.
const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = "vindhayavasini_admin_token";

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
  const encodedPublicId = encodeURIComponent(publicId);

  const res = await fetch(
    `${API_URL}/projects/${id}/gallery/${encodedPublicId}`,
    {
      method: "DELETE",
      headers: authHeaders(),
    }
  );

  return handleResponse(res);
}

export async function deleteLayoutPlanImage(id, publicId) {
  const encodedPublicId = encodeURIComponent(publicId);

  const res = await fetch(
    `${API_URL}/projects/${id}/layout-plan/${encodedPublicId}`,
    {
      method: "DELETE",
      headers: authHeaders(),
    }
  );

  return handleResponse(res);
}
  

// Builds the multipart FormData a project create/update expects from
// the plain JS object the form works with internally.
export function buildProjectFormData({
  name,
  subHeading,
  status,
  category,
  location,
  liveLocation,
  overview,
  highlights,
  order,
  isPublished,
  imageFile,
  layoutPlanFiles,
  galleryFiles,
  deletedGalleryPublicIds,
  deletedLayoutPlanPublicIds,
}) {
  const fd = new FormData();

  fd.append("name", name ?? "");
  fd.append("subHeading", subHeading ?? "");
  fd.append("status", status ?? "Ongoing");
  fd.append("category", category ?? "Residential");
  fd.append("location", location ?? "");
  fd.append("liveLocation", liveLocation ?? "");
  fd.append("overview", overview ?? "");
  fd.append("highlights", JSON.stringify(highlights ?? []));
  fd.append("order", String(order ?? 0));
  fd.append("isPublished", String(isPublished ?? true));

  // Images selected for deletion.
  // Backend will delete these only when Save Changes is clicked.
  fd.append(
    "deletedGalleryPublicIds",
    JSON.stringify(deletedGalleryPublicIds ?? [])
  );

  fd.append(
    "deletedLayoutPlanPublicIds",
    JSON.stringify(deletedLayoutPlanPublicIds ?? [])
  );

  if (imageFile) {
    fd.append("image", imageFile);
  }

  (layoutPlanFiles ?? []).forEach((file) => {
    fd.append("layoutPlan", file);
  });

  (galleryFiles ?? []).forEach((file) => {
    fd.append("gallery", file);
  });

  return fd;
}
// ---- Jobs ----
 
export async function getAllJobsAdmin() {
  const res = await fetch(`${API_URL}/jobs/admin/all`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
}
 
export async function createJob(job) {
  const res = await fetch(`${API_URL}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(job),
  });
  return handleResponse(res);
}
 
export async function updateJob(id, job) {
  const res = await fetch(`${API_URL}/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(job),
  });
  return handleResponse(res);
}
 
export async function deleteJob(id) {
  const res = await fetch(`${API_URL}/jobs/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse(res);
}
 

 
