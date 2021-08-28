import { useEffect, useState, useCallback } from 'react';
import { useApi } from '@/hooks/use-api';
import { NextPageContext } from 'next';
import cookies from 'next-cookies';

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

export default function Home({ accessToken }: HomeProps) {
  const { getResponse } = useApi(accessToken);
  const [userData, setUserData] = useState<UserData | null>(null);

  const getUserData = useCallback(async () => {
    const { data } = await getResponse(`/auth/me`);

    setUserData(data);
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <div className="container pt-32 mx-auto">
        <div className="flex flex-col">
          <h3 className="font-semibold mb-4">Datos del usuario</h3>
          {userData && (
            <div className="flex flex-col">
              {Object.keys(userData).map((data) => (
                <div className="flex text-sm mb-1" key={data}>
                  <span className="uppercase mr-4">{data}:</span>
                  <span>{userData[data]}</span>
                </div>
              ))}
            </div>
          )}
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
