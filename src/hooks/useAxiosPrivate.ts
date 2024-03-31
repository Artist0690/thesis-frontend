import React, { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import {
  AxiosError,
  AxiosHeaders,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { error } from "console";

type Props = {
  accessToken: string;
  refresh_fn: () => Promise<void>;
};

const useAxiosPrivate = ({ accessToken, refresh_fn }: Props) => {
  useEffect(() => {
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
          refresh_fn();
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
  }, [accessToken, refresh_fn]);
  return axiosPrivate;
};

export default useAxiosPrivate;
