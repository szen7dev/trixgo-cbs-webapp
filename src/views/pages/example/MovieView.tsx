import { FC, Fragment } from "react";

import { useInfiniteQuery } from "react-query";
import { map as _map } from "lodash";

import ExampleRepository from "apis/example";

import Spinner from "components/common/Spinner";
import ErrorPage from "views/pages/main/Error";
import MovieCard from "views/pages/example/MovieCard";

import { PopularMovieResponse } from "typings/example";

const MovieView: FC = () => {
  const {
    data,
    status,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<PopularMovieResponse, Error>(
    "popular-movies",
    async ({ pageParam = 1 }) => {
      const { page, results, total_pages, total_results } =
        await ExampleRepository.getPopularMovies({ pageParam });

      return { page, results, total_pages, total_results };
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    }
  );

  if (error) return <ErrorPage />;

  return status === "loading" ? (
    <Spinner className="border-primary-light" />
  ) : (
    <div className="container mx-auto px-4 pt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {data &&
          _map(data.pages, (page, idx: number) => (
            <Fragment key={`example-movie-${idx}`}>
              {_map(page.results, (movie) => (
                <MovieCard
                  key={movie.id}
                  description={movie.overview}
                  id={movie.id}
                  imagePath={movie.poster_path}
                  releaseDate={movie.release_date}
                  title={movie.title}
                  voteAverage={movie.vote_average}
                />
              ))}
            </Fragment>
          ))}
      </div>

      <div className="p-4">
        <button
          className="w-full h-12 px-6 text-accent transition-colors duration-150 bg-primary rounded-lg focus:shadow-outline hover:bg-secondary"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="mx-auto animate-spin w-5 h-5 fill-current "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          ) : hasNextPage ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="mx-auto animate-bounce w-5 h-5 fill-current "
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            "Nothing more to load"
          )}
        </button>
      </div>
    </div>
  );
};

export default MovieView;
