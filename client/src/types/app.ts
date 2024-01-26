import { placesType } from "./places";
import { userType } from "./user";

export interface propsType {
  userInfo?: userType[];
  userPlace?: placesType[];
}
