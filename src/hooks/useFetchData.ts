"use strict";

import axios from "axios";
import { Response } from "../lib/types/response";

const fetchUser = async () => {
  try {
    const response_axios = await axios.get("/api/user/me");
    console.log("FETCH USER 1: ",response_axios)
    const response = new Response(
      response_axios.data.response,
      response_axios.data.response ? true : false,
      response_axios ? "user exist!" : "user not exist!"
    );
    
    console.log("FETCH USER 1: ",response)
    return response;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return { erro: error };
  }
};

export { fetchUser };
