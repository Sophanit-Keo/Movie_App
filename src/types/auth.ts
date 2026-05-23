export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterResponse {
  message: string;
  user?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  token?: string;
  errors?: Record<string, string[]>;
}


export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  token?: string;
  errors?: Record<string, string[]>;
}

export interface VerifyRequest {
  code: string;
}

export interface VerifyResponse {
  message: string;
  token?: string;
  errors?: Record<string, string[]>;
}