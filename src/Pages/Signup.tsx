import React from "react";

const Signup_Page = () => {
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

export default Signup_Page;
