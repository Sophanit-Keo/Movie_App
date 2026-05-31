import { Profile } from "../models/profile";


const BASE_URL = process.env.EXPO_PUBLIC_API_URL;



export async function getUser(token: string): Promise<Profile> {
  const response = await fetch(`${BASE_URL}user`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json','Authorization': `Bearer ${token}`  },
  });
  const json = await response.json();
  if (!response.ok) throw json;
  return json;
}

export interface UpdateProfileRequest {
  first_name: string;
  last_name: string;
  email?: string;
}

export async function updateProfile(token: string, data: UpdateProfileRequest): Promise<Profile> {
  const url = `${BASE_URL}user/profile`;
  console.log('updateProfile url:', url, 'body:', data);
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  console.log('updateProfile status:', response.status, 'body:', json);
  if (!response.ok) throw json;
  return json;
}