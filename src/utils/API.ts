const API_ROOT = 'https://api.themoviedb.org/3';
const API_KEY = '1b900dfc0ca892fe14f5f40c3bda90b7';

const onResponse = (response: Response) => response.json();

const requests = {
  get: (page: number, path: string) => {
    // const url = new URL(path, API_ROOT)
    const url = `${API_ROOT}${path}api_key=${API_KEY}&page=${page}`;
    return fetch(`${url}`,
      {
        method: 'GET',
      })
      .then(onResponse);
  },
};

export const moviesAPI = {
  getList: (page, path = '/movie/top_rated?') => requests.get(page, path),
};
