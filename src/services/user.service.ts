import { TParamsLogin } from "../pages/login/login";
import { TParamsRegister } from "../pages/register/register";
import { axiosWithAuth,axiosWithoutAuth } from "./config.service";

export const getUser = async (keyword: string) => {
  try {
    const resp = await axiosWithAuth(`/Users/getUser?keyword=${keyword}`);

    return resp.data;
  } catch (err) {
    console.log(err);
  }
};
export const assignUserProject = async (data: any) => {
  try {
    const resp = await axiosWithAuth({
      url: `/Project/assignUserProject`,
      method: "post",
      data,
    });

    return resp.data;
  } catch (err) {
    console.log(err);
  }
};

export const signup = async (data: TParamsRegister) => {
  try {
    const resp = await axiosWithoutAuth({
      method: "post",
      url: "/Users/signup",
      data,
    });
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};

export const userLogin = async (data: TParamsLogin) => {
  try {
    const resp = await axiosWithoutAuth({
      method: "post",
      url: "/Users/signin",
      data,
    });

    return resp.data;
  } catch (error) {
    console.log(error);
  }
};


