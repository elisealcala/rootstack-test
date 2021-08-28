import axios from 'axios';

export const useApi = (accessToken: string) => {
  const ENDPOINT = `https://coding-test.rootstack.net/api`;

  const getResponse = async (ednpoint: string) => {
    const response = await axios.get(`${ENDPOINT}${ednpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  };

  return {
    getResponse,
  };
};
