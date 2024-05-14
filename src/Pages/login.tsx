import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
    formState: { errors },
  } = useForm<FormType>({ resolver: zodResolver(FormSchema) });

  const navigate = useNavigate();
  //store
  const { setUserInfo } = userInfo_store();

  // login funciton
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
    // page
    <div className="flex w-full h-screen bg-zinc-100 justify-center items-center">
      {/* container */}
      <div className="flex flex-col min-w-[500px] bg-white gap-y-5 border border-slate-200 rounded-md p-10 shadow-sm">
        {/* header */}
        <div>
          <h1 className="font-[inter thin] font-semibold text-2xl">
            Sign in to your account
          </h1>
        </div>
        {/* form */}
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-y-5"
        >
          {/* email 📜 */}
          <div className="flex flex-col gap-y-3">
            <label htmlFor="email" className="font-[inter thin] text-lg">
              Your email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="text-lg py-2 pl-3 text-gray-600 rounded-xl border border-slate-300 outline-none focus:ring-purple-400 focus:ring-1"
            />
            {errors.email && (
              <p className="text-red-400 font-[inter thin]">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* password ☢️ */}
          <div className="flex flex-col gap-y-3">
            <label htmlFor="password" className="font-[inter thin] text-lg">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="text-lg py-2 pl-3 text-gray-600 rounded-xl border border-slate-300 outline-none focus:ring-purple-400 focus:ring-1"
            />
            {errors.password && (
              <p className="text-red-400 font-[inter thin]">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* error message from server 🚨 */}
          <p className="text-red-400 font-[inter thin]">
            {errorMessage && errorMessage}
          </p>
          {/* buttons🕹️ */}
          <div>
            <div className="flex flex-col justify-start gap-y-3">
              <button
                onClick={() => trigger()}
                className="flex bg-blue-600 text-white justify-center items-center text-lg px-3 py-2 rounded-lg font-[inter thin] outline-none focus:ring-1 focus:ring-purple-400"
              >
                Sign in
              </button>
              <span className="flex gap-x-3">
                Don't you have an account?
                <Link to={"/signup"} className="text-blue-500">
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login_Page;
