/**
 * API Service for Student Task Manager
 * Communicates with backend Express REST API
 */

/**
 * Normalize API Base URL:
 * Ensures it gracefully handles trailing slashes or omitted '/api'
 */
const getApiBaseUrl = () => {
  let url = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').trim();
  url = url.replace(/\/+$/, ''); // remove trailing slash
  if (!url.endsWith('/api')) {
    url = `${url}/api`;
  }
  return url;
};

const API_BASE_URL = getApiBaseUrl();

/**
 * Handle API response and check for HTTP errors
 */
async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const errorMessage = (data && data.message) || response.statusText || 'Network response was not ok';
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Fetch all tasks with optional filters
 * @param {Object} [filters] - { status, priority, search, sortBy }
 */
export async function getAllTasks(filters = {}) {
  const queryParams = new URLSearchParams();

  if (filters.status && filters.status !== 'All') {
    queryParams.append('status', filters.status);
  }
  if (filters.priority && filters.priority !== 'All') {
    queryParams.append('priority', filters.priority);
  }
  if (filters.search && filters.search.trim()) {
    queryParams.append('search', filters.search.trim());
  }
  if (filters.sortBy) {
    queryParams.append('sortBy', filters.sortBy);
  }

  const queryString = queryParams.toString();
  const url = `${API_BASE_URL}/tasks${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return handleResponse(response);
}

/**
 * Fetch a single task by ID
 * @param {string} id
 */
export async function getTaskById(id) {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return handleResponse(response);
}

/**
 * Create a new task
 * @param {Object} taskData - { title, description, priority, deadline, status }
 */
export async function createTask(taskData) {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  });

  return handleResponse(response);
}

/**
 * Update an existing task
 * @param {string} id
 * @param {Object} taskData
 */
export async function updateTask(id, taskData) {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  });

  return handleResponse(response);
}

/**
 * Delete a task
 * @param {string} id
 */
export async function deleteTask(id) {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return handleResponse(response);
}

/**
 * Toggle task status between Pending and Completed
 * @param {string} id
 * @param {string} currentStatus
 */
export async function toggleTaskStatus(id, currentStatus) {
  const newStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';
  return updateTask(id, { status: newStatus });
}
