import { User } from "../../../types/user";
import { publicAxios } from "../../axios";
import { paths } from "../../paths";

interface LoginDataResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export const loginService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User | null> => {
  console.log(paths.base);

  try {
    await fetch("https://backend-release.up.railway.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("data 1 :", data));

    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: import.meta.env.VITE_EMAIL || "",
        password: import.meta.env.VITE_PASSWORD || "",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("data 2 :", data));

    await fetch(`${paths.auth}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("data 3 :", data));

    const { data: resData } = await publicAxios.post(
      `auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    const data = resData.data as LoginDataResponse;

    return {
      token: data.token,
      id: data.user.id,
      email: data.user.email,
      name: data.user.name,
      role: data.user.role,
    };
  } catch (error) {
    console.error(error);

    return null;
  }
};
