import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [form, setForm] = useState({
    email: ``,
    password: ``,
  });

  const handleChange = (value: string, type: 'email' | 'password') => {
    setForm({
      ...form,
      [type]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `https://coding-test.rootstack.net/api/auth/login`,
        form,
      );

      if (response.data.access_token) {
        document.cookie = `access_token=${response.data.access_token}`;
        setIsAuthenticated(true);
        router.push(`/`);
      }
    } catch (e) {
      toast.error(`Something went wrong`, {
        position: `top-right`,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return {
    isAuthenticated,
    handleChange,
    handleSubmit,
  };
};
