import { UserModel } from "src/app/pages/users/model/user.model";

export class DataContract {
  data!: UserModel[];
  total!: number;
  page!: number;
  limit!: number;
}
