// frontend/src/lib/adminApi.js
//
// API wrapper for the Vindhayavasini Construction admin panel.
// Handles:
// - API requests
// - JWT token storage
// - Authorization headers
// - Automatic token removal on 401 errors
// - Admin login/logout
// - Projects
// - Jobs

const API_URL = import.meta.env.VITE_API_URL;

const TOKEN_KEY = "vindhayavasini_admin_token";

// --------------------------------------------------
// Token Helpers
// --------------------------------------------------

export function getToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (typeof window === "undefined") {
    return;
  }

  if (!token) {
    throw new Error("No authentication token received from the backend.");
  }

  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
}

// --------------------------------------------------
// API URL Validation
// --------------------------------------------------

if (!API_URL) {
  console.warn(
    "VITE_API_URL is not defined. Please check your frontend environment variables."
  );
}

// --------------------------------------------------
// Authorization Headers
// --------------------------------------------------

function authHeaders() {
  const token = getToken();

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
}

// --------------------------------------------------
// Common Response Handler
// --------------------------------------------------

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));

  // Automatically remove expired/invalid token.
  if (res.status === 401) {
    clearToken();
  }

  if (!res.ok) {
    const error = new Error(
      data.message || `Request failed (${res.status})`
    );

    error.status = res.status;
    error.response = data;

    throw error;
  }

  return data;
}

// --------------------------------------------------
// Authentication
// --------------------------------------------------

export async function login(username, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await handleResponse(res);

  console.log("Admin login response:", data);

  /*
    Supports these backend response formats:

    {
      token: "..."
    }

    {
      accessToken: "..."
    }

    {
      data: {
        token: "..."
      }
    }
  */

  const token =
    data.token ||
    data.accessToken ||
    data.data?.token;

  if (!token) {
    console.error(
      "The backend login response does not contain a token:",
      data
    );

    throw new Error(
      "Login failed: no authentication token was returned by the server."
    );
  }

  setToken(token);

  console.log(
    "Admin token saved:",
    Boolean(getToken())
  );

  return data;
}

export async function verifyToken() {
  const res = await fetch(`${API_URL}/auth/verify`, {
    method: "GET",
    headers: authHeaders(),
  });

  return handleResponse(res);
}

export function logout() {
  clearToken();
}

// --------------------------------------------------
// Projects
// --------------------------------------------------

export async function getAllProjectsAdmin() {
  const res = await fetch(`${API_URL}/projects/admin/all`, {
    method: "GET",
    headers: authHeaders(),
  });

  return handleResponse(res);
}

export async function createProject(formData) {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      ...authHeaders(),

      // Do not add Content-Type here.
      // The browser automatically adds the multipart boundary.
    },
    body: formData,
  });

  return handleResponse(res);
}

export async function updateProject(id, formData) {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "PUT",
    headers: {
      ...authHeaders(),

      // Do not add Content-Type for FormData.
    },
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

// --------------------------------------------------
// Project FormData Builder
// --------------------------------------------------

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
  // Backend deletes them when Save Changes is clicked.
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

// --------------------------------------------------
// Jobs
// --------------------------------------------------

export async function getAllJobsAdmin() {
  const res = await fetch(`${API_URL}/jobs/admin/all`, {
    method: "GET",
    headers: authHeaders(),
  });

  return handleResponse(res);
}

export async function createJob(job) {
  const res = await fetch(`${API_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(job),
  });

  return handleResponse(res);
}

export async function updateJob(id, job) {
  const res = await fetch(`${API_URL}/jobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
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