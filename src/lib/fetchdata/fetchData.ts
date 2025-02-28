import axios from "axios";

const fetchUser = async () => {
  try {
    const response = await axios.get("/api/user/me");
    if(response){
      return response.data.user;
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return { erro: error };
  }
};

export { fetchUser };
