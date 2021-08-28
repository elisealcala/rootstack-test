import { useEffect, useState, useCallback } from 'react';
import { useApi } from '@/hooks/use-api';
import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';

import { useAuth } from '@/hooks';
import Point from '@/components/Point';

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
  const [selectedId, setSelectedId] = useState<number | null>(null);

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

  const Map = ReactMapboxGl({
    accessToken: `pk.eyJ1IjoiZWxpc2VhbGNhbGEiLCJhIjoiY2tzdmFkN2hyMW80YzJ2cDc0dHg2a25kdiJ9.uAijmE5csxfa6J7haRlc6w`,
  });
  return (
    <div className="bg-gray-100">
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
                <div
                  role="presentation"
                  className={`flex flex-col cursor-pointer items-center ${
                    job.id === selectedId && `bg-red-300`
                  }`}
                  key={job.id}
                  onClick={() => setSelectedId(job.id)}
                >
                  <img src={job.image} alt="" />
                  <h4>{job.title}</h4>
                  <span className="text-xs">{job.description}</span>
                </div>
              ))}
            </div>
          )}
          <span className="my-8 bg-red-100 text-sm">
            Puedes hacer click en los trabajos o en los items del map
          </span>
          <div className="w-full relative mt-10">
            <Map
              style={`mapbox://styles/mapbox/streets-v9`}
              containerStyle={{
                height: `600px`,
                width: `100%`,
              }}
              center={[-65.017, -16.457]}
              zoom={[1]}
            >
              {jobs.map((job) => (
                <Marker
                  key={job.id}
                  coordinates={[Number(job.longitude), Number(job.latitude)]}
                  anchor="bottom"
                >
                  <Point
                    label={job.title}
                    selected={selectedId === job.id}
                    onClick={() => setSelectedId(job.id)}
                  />
                </Marker>
              ))}
            </Map>
          </div>
          <div className="my-20">
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
