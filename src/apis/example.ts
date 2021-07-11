import Axios from "axios";

import { sleep } from "helpers/time";

import {
  ExampleAPI,
  PopularMoviePayload,
  PopularMovieResponse,
} from "typings/example";

const API = Axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `bearer ${process.env.REACT_APP_MOVIE_API_TOKEN}`,
  },
});

// A mock function to mimic making an async request for data
const fetchCount = (
  amount = 1
): Promise<{
  data: number;
}> => {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 1600)
  );
};

// Example movies fetcher
const getPopularMovies = async ({
  pageParam,
}: PopularMoviePayload): Promise<PopularMovieResponse> => {
  await sleep(2500);

  const { data } = await API.get<PopularMovieResponse>(
    `/movie/popular?page=${pageParam}&api_key=${process.env.REACT_APP_MOVIE_API_KEY}`
  );

  return data;
};

const ExampleRepository: ExampleAPI = {
  fetchCount,
  getPopularMovies,
};

export default ExampleRepository;
