import { UserModel } from "./user-model";

export interface ApiResponseModel {
  token: string;
  user: UserModel;
}
