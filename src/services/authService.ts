import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, VerifyRequest, VerifyResponse } from "../types/auth";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// Register API
export async function registerUser(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  if (!response.ok) throw json; 
  return json;
}
// Login
export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  if (!response.ok) throw json;
  return json;
}
// Veriify Email
export async function verifyEmail(data: VerifyRequest, token: string): Promise<VerifyResponse> {
  const url = `${BASE_URL}/email/verify/check`;
  console.log('verifyEmail url:', url, 'token:', token);
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  console.log('verifyEmail status:', response.status, 'body:', json);
  if (!response.ok) throw json;
  return json;
}
// Resend Code
export async function resendCode(token: string): Promise<{ message: string }> {
  const url = `${BASE_URL}/email/verify/send`;
  console.log('resendCode url:', url, 'token:', token);
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
  });
  const json = await response.json();
  console.log('resendCode status:', response.status, 'body:', json);
  if (!response.ok) throw json;
  return json;
}
