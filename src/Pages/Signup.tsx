import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z, { string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { signup_controller } from "../controllers/signup_controller";
import { AxiosError } from "axios";
import KeyGeneration from "../crypto/RSA/KeyGeneration";
import { signupResponseSchema } from "../zod/signupResponse";
import { dexie_db } from "../dexie_db/db";

const Signup_Page = () => {
  const errorMessageSchema = z.object({ message: z.string() });
  const [errorMessage, seterrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  // generate RSA key pairs 🔑🗝️
  const { privateKey, publicKey } = KeyGeneration();

  const FormSchema = z.object({
    name: z
      .string()
      .max(15, "Name should not exceed more than 15 characters.")
      .min(3, "Name should be at least 3 characters."),
    email: z.string().email(),
    password: z
      .string()
      .max(15, "Password should not exceed more than 15 characters.")
      .min(8, "Password should be at least 8 characters.")
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

  //  react hook form hook
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm<FormType>({ resolver: zodResolver(FormSchema) });

  // signup handler function
  const handleSignup: SubmitHandler<FormType> = async (data) => {
    console.log(data);

    const payload = {
      ...data,
      rsa_public_key: publicKey as string,
    };
    // send request to signup
    signup_controller(payload)
      .then((response) => {
        console.log(response.data);
        // store RSA private key in somewhere 🎁
        seterrorMessage(null);
        // store private key in indexeddb
        const zCheck = signupResponseSchema.safeParse(response.data);
        if (!zCheck.success) {
          seterrorMessage("Something went wrong.");
          return;
        }
        dexie_db.key_table
          .add({
            key: privateKey as string,
            userId: zCheck.data.id,
          })
          .then((result) => console.log(result))
          .catch((error) => console.log(error));
        navigate("/login");
      })
      .catch((err) => {
        const error = err as AxiosError;
        if (error.response?.status === 401 || 403) {
          const Zcheck = errorMessageSchema.safeParse(error.response?.data);
          if (Zcheck.success) seterrorMessage(Zcheck.data.message);
        }
      });
    reset();
  };

  return (
    // page
    <div className="flex w-full h-screen bg-white justify-center items-center">
      {/* container */}
      <div className="flex flex-col min-w-[500px] bg-white border border-slate-200 rounded-md gap-y-5 p-10 shadow-sm">
        {/* header */}
        <div>
          <h1 className="font-[inter thin] font-semibold text-2xl">
            Create an account
          </h1>
        </div>
        {/* form */}
        <form
          onSubmit={handleSubmit(handleSignup)}
          className="flex flex-col gap-y-5"
        >
          {/* name 🧑🏻 */}
          <div className="flex flex-col gap-y-3">
            <label htmlFor="name" className=" font-[inter thin] text-lg">
              Your name
            </label>
            <input
              id="name"
              type="name"
              {...register("name")}
              className="text-lg py-2 pl-3 text-gray-600 rounded-xl border border-slate-300 outline-none focus:ring-purple-400 focus:ring-1"
            />
            {errors.name && (
              <p className="text-red-400">{errors.name.message}</p>
            )}
          </div>
          {/* email 📜 */}
          <div className="flex flex-col gap-y-3">
            <label htmlFor="email" className=" font-[inter thin] text-lg">
              Your email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="text-lg py-2 pl-3 text-gray-600 rounded-xl border border-slate-300 outline-none focus:ring-purple-400 focus:ring-1"
            />
            {errors.email && (
              <p className="text-red-400">{errors.email.message}</p>
            )}
          </div>
          {/* password ☢️ */}
          <div className="flex flex-col gap-y-3">
            <label htmlFor="password" className=" font-[inter thin] text-lg">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="text-lg py-2 pl-3 text-gray-600 rounded-xl border border-slate-300 outline-none focus:ring-purple-400 focus:ring-1"
            />
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}
          </div>
          {/* error message from server 🚨 */}
          <p className="text-red-400">{errorMessage && errorMessage}</p>
          {/* signup buttons🕹️ */}
          <div className="flex w-full">
            <button
              onClick={() => trigger()}
              className="w-full bg-blue-500 text-white text-lg py-2 rounded-lg font-[inter thin] outline-none focus:ring-1 focus:ring-purple-400"
            >
              Create an account
            </button>
          </div>
          {/* login link */}
          <div className="flex w-full gap-x-2">
            Already have an accont?
            <Link to="/login" className="font-[inter thin] text-indigo-500">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup_Page;
