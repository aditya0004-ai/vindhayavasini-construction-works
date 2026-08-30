const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const getToken = () => {
  return localStorage.getItem("adminToken");
};

const request = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    ...(options.headers || {}),
  };

  // Don't manually set Content-Type for FormData.
  // Browser will automatically set the multipart boundary.
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = `${API_URL}${endpoint}`;

  console.log("API Request:", url);

  const response = await fetch(url, {
    ...options,
    headers,
  });

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
        data.error ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
};

// ==========================================
// ADMIN AUTH
// ==========================================

export const adminLogin = async (
  username,
  password
) => {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  });
};

export const verifyAdmin = async () => {
  return request("/auth/verify", {
    method: "GET",
  });
};

// ==========================================
// PROJECTS
// ==========================================

export const getAdminProjects = async () => {
  return request("/projects/admin/all", {
    method: "GET",
  });
};

export const createProject = async (formData) => {
  return request("/projects", {
    method: "POST",
    body: formData,
  });
};

export const updateProject = async (
  id,
  formData
) => {
  return request(`/projects/${id}`, {
    method: "PUT",
    body: formData,
  });
};

export const deleteProject = async (id) => {
  return request(`/projects/${id}`, {
    method: "DELETE",
  });
};

export const deleteGalleryImage = async (
  projectId,
  publicId
) => {
  return request(
    `/projects/${projectId}/gallery/${encodeURIComponent(
      publicId
    )}`,
    {
      method: "DELETE",
    }
  );
};

export { API_URL };