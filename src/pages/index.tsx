import { useEffect, useState, useCallback } from 'react';
import { useApi } from '@/hooks/use-api';
import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import { useAuth } from '@/hooks';

type HomeProps = {
  accessToken: string;
};

type UserData = {
  [key: string]: any;
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
};

type Job = {
  id: number;
  description: string;
  image: string;
  latitude: string;
  longitude: string;
  title: string;
};

export default function Home({ accessToken }: HomeProps) {
  const { getResponse } = useApi(accessToken);
  const { logout } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  const getUserData = useCallback(async () => {
    const { data } = await getResponse(`/auth/me`);

    setUserData(data);
  }, []);

  const getJobsData = useCallback(async () => {
    const { data } = await getResponse(`/jobs`);

    setJobs(data.data);
  }, []);

  useEffect(() => {
    getUserData();
    getJobsData();
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <div className="container pt-32 mx-auto">
        <div className="flex flex-col">
          <h3 className="font-semibold mb-4">Datos del usuario</h3>
          {userData && (
            <div className="flex flex-col mb-8">
              {Object.keys(userData).map((data) => (
                <div className="flex text-sm mb-1" key={data}>
                  <span className="uppercase mr-4">{data}:</span>
                  <span>{userData[data]}</span>
                </div>
              ))}
            </div>
          )}
          <h3 className="font-semibold mb-4">Trabajos listados</h3>
          {jobs.length > 0 && (
            <div className="grid grid-cols-6 gap-4">
              {jobs.map((job) => (
                <div className="flex flex-col items-center" key={job.id}>
                  <img src={job.image} alt="" />
                  <h4>{job.title}</h4>
                </div>
              ))}
            </div>
          )}
          <div className="mt-36">
            <button
              className="bg-blue-400 text-white py-2 px-3 rounded-lg"
              type="button"
              onClick={logout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { accessToken } = cookies(ctx);

  if (!accessToken) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      accessToken,
    },
  };
};
