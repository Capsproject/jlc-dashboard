export interface Users {
  id: number;
  name: string;
  email: string;
  is_enabled: number;
  created_at: string;
  updated_at: string;
  user_role_id: number;
  user_role: UserRole;
}

export interface UserRole  {
  id: number;
  name: string;
  is_enabled: number;
  created_at: string;
  updated_at: string;
}
