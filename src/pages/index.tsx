import { NextPageContext } from 'next';
import cookies from 'next-cookies';

export default function Home() {
  return <div className="bg-gray-100 h-screen">asds</div>;
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
    props: {},
  };
};
