"use strict";

import axios from "axios";
import { Response } from "../lib/types/response";
import { User } from "../lib/types/user";

interface CreateUserProps {
  newUser: User;
}

const createUser = async ({ newUser }: CreateUserProps) => {
    const name = newUser.name
    const email = newUser.email
    const password = newUser.password
  try {
     const response_axios = await axios.post("/api/user/create", {name, email, password});    
     return response_axios.data as Response;


  } catch (error) {
    console.log("error: ", error);
  }
};

export { createUser };
