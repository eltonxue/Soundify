import { Request as ExpressRequest } from "express";
import { User } from "../entities";

interface RequestWithUser extends ExpressRequest {
  user?: User;
}

export default RequestWithUser;
