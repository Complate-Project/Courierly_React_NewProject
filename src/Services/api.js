const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://courier.demo-bd.com';

/**
 * Maps backend API numerical or string roles to app frontend roles ('admin' | 'branch' | 'rider')
 */
export const mapRoleToAppRole = (apiRole, defaultRole = 'admin') => {
  if (!apiRole) return defaultRole;
  const roleStr = String(apiRole).toLowerCase().trim();

  // Role 8 or contains hub/branch => branch
  if (roleStr === '8' || roleStr.includes('branch') || roleStr.includes('hub')) {
    return 'branch';
  }
  // Role 1 or contains admin => admin
  if (roleStr === '1' || roleStr.includes('admin')) {
    return 'admin';
  }
  // Role 2 or contains rider => rider
  if (roleStr === '2' || roleStr.includes('rider')) {
    return 'rider';
  }

  return defaultRole;
};

/**
 * Authenticates user against backend API endpoint
 * Endpoint: POST https://courier.demo-bd.com/api/login
 * Uses form-data body format matching Postman specification (email & password)
 */
export const loginApi = async (credentials) => {
  const formData = new FormData();
  const emailValue = credentials.email || credentials.username || '';
  const passwordValue = credentials.password || '';

  formData.append('email', emailValue);
  formData.append('password', passwordValue);

  try {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    });

    const data = await response.json();
    return { status: response.status, data };
  } catch {
    // Retry with JSON fallback if FormData network error occurs
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    });

    const data = await response.json();
    return { status: response.status, data };
  }
};

/**
 * Fetches all parcels list from backend API
 * Endpoint: GET https://courier.demo-bd.com/api/all-parcel-list
 */
export const getAllParcelListApi = async () => {
  const token = localStorage.getItem('authToken');
  const headers = {
    'Accept': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}/api/all-parcel-list`, {
    method: 'GET',
    headers,
  });

  const data = await response.json();
  return { status: response.status, data };
};

/**
 * Fetches hub rider list from backend API
 * Endpoint: GET https://courier.demo-bd.com/api/hub-rider-list
 */
export const getHubRiderListApi = async () => {
  const token = localStorage.getItem('authToken');
  const headers = {
    'Accept': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}/api/hub-rider-list`, {
    method: 'GET',
    headers,
  });

  const data = await response.json();
  return { status: response.status, data };
};

/**
 * Fetches hub auto assign rider assignments and merchant list
 * Endpoint: GET https://courier.demo-bd.com/api/hub-auto-assign-for-rider
 */
export const getHubAutoAssignRiderApi = async () => {
  const token = localStorage.getItem('authToken');
  const headers = {
    'Accept': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}/api/hub-auto-assign-for-rider`, {
    method: 'GET',
    headers,
  });

  const data = await response.json();
  return { status: response.status, data };
};

/**
 * Fetches hub dashboard metrics from backend API
 * Endpoint: GET https://courier.demo-bd.com/api/hub-dashboard
 */
export const getHubDashboardApi = async () => {
  const token = localStorage.getItem('authToken');
  const headers = {
    'Accept': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}/api/hub-dashboard`, {
    method: 'GET',
    headers,
  });

  const data = await response.json();
  return { status: response.status, data };
};

/**
 * Submits bulk pickup collection for hub
 * Endpoint: POST https://courier.demo-bd.com/api/hub-pickup-bulk-collection
 * @param {Array<string>} trackingIds - List of parcel tracking IDs to collect
 */
export const hubPickupBulkCollectionApi = async (trackingIds) => {
  const token = localStorage.getItem('authToken');
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}/api/hub-pickup-bulk-collection`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      tracking_ids: trackingIds,
    }),
  });

  const data = await response.json();
  return { status: response.status, data };
};

/**
 * Submits single pickup collection for hub
 * Endpoint: POST https://courier.demo-bd.com/api/hub-pickup-single-collection
 * Form-data key: 'id' (tracking_id value, e.g. CLab134025156)
 * @param {string} trackingId
 */
export const hubPickupSingleCollectionApi = async (trackingId) => {
  const token = localStorage.getItem('authToken');
  const headers = {
    'Accept': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const formData = new FormData();
  formData.append('id', trackingId);
  formData.append('tracking_id', trackingId);

  try {
    const response = await fetch(`${BASE_URL}/api/hub-pickup-single-collection`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();
    return { status: response.status, data };
  } catch {
    // Retry with JSON fallback
    const jsonHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (token) jsonHeaders['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${BASE_URL}/api/hub-pickup-single-collection`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify({ id: trackingId, tracking_id: trackingId }),
    });

    const data = await response.json();
    console.log(data);
    return { status: response.status, data };
  }
};



