import { useAuth } from '@/hooks';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const Login = () => {
  const { handleChange, handleSubmit } = useAuth();

  return (
    <div className="bg-gray-100 h-screen">
      <ToastContainer />
      <div className="container h-full mx-auto flex justify-center items-center">
        <form
          className="flex flex-col bg-white p-12 rounded-lg shadow-xs w-80"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            className="border border-solid border-gray-400 rounded-sm p-2 mb-4"
            placeholder="Email"
            type="email"
            onChange={(e) => handleChange(e.target.value, `email`)}
          />
          <input
            className="border border-solid border-gray-400 rounded-sm p-2 mb-4"
            placeholder="Password"
            type="password"
            onChange={(e) => handleChange(e.target.value, `password`)}
          />
          <button
            type="submit"
            className="bg-blue-400 text-white px-4 py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
