import React, { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { userInfo_store } from "../store/userInfo_store";
import useRefresh from "./useRefresh";

const useAxiosPrivate = () => {
  const { accessToken } = userInfo_store();
  const refresh_token = useRefresh();

  useEffect(() => {
    // console.log("inside useAxiosPrivate: ", accessToken);
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const prevRequest = error.config;
        if (error.response?.status === 403) {
          // to refresh access token and store in global state
          refresh_token();
          prevRequest!.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosPrivate(prevRequest as AxiosRequestConfig);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh_token]);
  return axiosPrivate;
};

export default useAxiosPrivate;
