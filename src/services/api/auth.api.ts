// Update the base URL for backend API
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001/api';

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
      avatar?: string;
    };
  };
  // Backwards compatibility
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
}

interface UserResponse {
  success: boolean;
  data?: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
}

// Register new user
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    console.log('[Auth API] Registering user:', data.email);
    const response = await fetch(`${BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const responseData = await response.json();
    console.log('[Auth API] Register response:', responseData);
    
    if (!response.ok) {
      return {
        success: false,
        message: responseData.message || 'Registration failed',
      };
    }
    
    return responseData;
  } catch (error) {
    console.error('[Auth API] Register error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection.',
    };
  }
};

// Login user
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  try {
    console.log('[Auth API] Logging in user:', data.email);
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const responseData = await response.json();
    console.log('[Auth API] Login response:', responseData);
    
    if (!response.ok) {
      return {
        success: false,
        message: responseData.message || 'Login failed',
      };
    }
    
    return responseData;
  } catch (error) {
    console.error('[Auth API] Login error:', error);
    return {
      success: false,
      message: 'Network error. Please check if the backend is running.',
    };
  }
};

// Get current user
export const getCurrentUser = async (token: string): Promise<UserResponse> => {
  try {
    console.log('[Auth API] Getting current user with token');
    const response = await fetch(`${BACKEND_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      console.log('[Auth API] getCurrentUser failed with status:', response.status);
      return { success: false };
    }
    
    const responseData = await response.json();
    console.log('[Auth API] getCurrentUser response:', responseData);
    return responseData;
  } catch (error) {
    console.error('[Auth API] Get user error:', error);
    return { success: false };
  }
};

// Update user profile
export const updateUserProfile = async (
  token: string,
  data: { name?: string; avatar?: string }
): Promise<UserResponse> => {
  const response = await fetch(`${BACKEND_URL}/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export default {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUserProfile,
};
