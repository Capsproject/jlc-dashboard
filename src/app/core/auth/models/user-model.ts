import { UserRole } from "../../../features/user-management/models/api-response";

export interface UserModel {
  id: number;
  name: string;
  email: string;
  is_enabled: number;
  created_at: string;
  updated_at: string;
  user_role_id: number;
  user_role: UserRole;
}


