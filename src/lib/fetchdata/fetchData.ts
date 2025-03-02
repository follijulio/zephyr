'use strict'

import axios from "axios";
import { Response } from "../types/response";



const fetchUser = async () => {
  try {
    const response_axios = await axios.get("/api/user/me");
    console.log(response_axios.data)
    const user = response_axios.data.user;

    const response = new Response(
      response_axios ? true : false,
      user,
      response_axios ? "user exist!" : "user not exist!"
    );

    return response;

  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return { erro: error };
  }
};

export { fetchUser };
