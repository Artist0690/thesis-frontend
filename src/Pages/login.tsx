import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { data } from "autoprefixer";
import { Link, useNavigate } from "react-router-dom";
import { login_controller } from "../controllers/login_controller";
import { AxiosError } from "axios";
import { userInfo_store } from "../store/userInfo_store";

const Login_Page = () => {
  const errorMessageSchema = z.object({
    message: z.string(),
  });
  const [errorMessage, seterrorMessage] = useState<string | null>(null);

  const FormSchema = z.object({
    email: z.string().email("Invalid email."),
    password: z
      .string()
      .max(15)
      .min(8)
      .superRefine((val, ctx) => {
        if (/\s/g.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password don't allow space character.",
          });
        }
      }),
  });

  type FormType = z.infer<typeof FormSchema>;

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm<FormType>({ resolver: zodResolver(FormSchema) });

  const navigate = useNavigate();
  //store
  const { setUserInfo } = userInfo_store();

  const handleLogin: SubmitHandler<FormType> = async (data) => {
    console.log(data);
    login_controller(data)
      .then((response) => {
        // console.log(response.data);
        seterrorMessage(null);
        // set accesstoken in store
        const schema = z.object({
          id: z.string(),
          name: z.string(),
          email: z.string(),
          accessToken: z.string(),
        });
        const check = schema.safeParse(response.data);
        // store userInfo into global state
        if (check.success) setUserInfo(check.data);
        navigate("/chat");
      })
      .catch((err) => {
        const error = err as AxiosError;
        if (error.response?.status === 401) {
          const Zcheck = errorMessageSchema.safeParse(error.response.data);
          if (Zcheck.success) seterrorMessage(Zcheck.data.message);
        }
      });

    reset();
    seterrorMessage(null);
  };

  return (
    <div className="flex w-full h-screen bg-zinc-100 justify-center items-center">
      <div className="flex flex-col min-w-[500px] bg-white gap-y-5 shadow-lg p-10">
        <div>
          <h1 className="text-5xl mb-4 font-[poppins] font-semibold capitalize text-zinc-600 text-center">
            login form
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-y-5"
        >
          {/* email 📜 */}
          <div className="flex flex-col gap-y-3">
            <label
              htmlFor="email"
              className="capitalize font-[poppins] text-lg"
            >
              email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="text-lg py-2 pl-3 text-gray-600 rounded-lg border border-zinc-400 outline-none focus:ring-purple-400 focus:ring-1"
            />
            {errors.email && (
              <p className="text-red-400">{errors.email.message}</p>
            )}
          </div>
          {/* password ☢️ */}
          <div className="flex flex-col gap-y-3">
            <label
              htmlFor="password"
              className="capitalize font-[poppins] text-lg"
            >
              password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="text-lg py-2 pl-3 text-gray-600 rounded-lg border border-zinc-400 outline-none focus:ring-purple-400 focus:ring-1"
            />
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}
          </div>
          {/* error message from server 🚨 */}
          <p className="text-red-400">{errorMessage && errorMessage}</p>
          {/* buttons🕹️ */}
          <div>
            <div className="flex flex-row justify-between">
              <button
                onClick={() => trigger()}
                className="bg-zinc-300 text-gray-600 text-lg px-3 py-2 rounded-lg font-[poppins] outline-none focus:ring-1 focus:ring-purple-400"
              >
                Login
              </button>
              <Link
                to={"/"}
                className="text-purple-400 bg-white text-lg px-3 py-2 rounded-lg border-2 border-zinc-300 font-[poppins] outline-none focus:ring-1 focus:ring-purple-400"
              >
                Home
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login_Page;
