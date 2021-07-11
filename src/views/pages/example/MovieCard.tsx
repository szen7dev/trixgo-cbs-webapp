import { FC } from "react";

import moment from "moment";

type Props = {
  description: string;
  id: number;
  imagePath: string;
  releaseDate: string;
  title: string;
  voteAverage: number;
};

const MovieCard: FC<Props> = ({
  id,
  title,
  imagePath,
  releaseDate,
  voteAverage,
  description,
}) => {
  return (
    <div className="mt-8">
      <a
        href={`https://www.themoviedb.org/movie/${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${imagePath}`}
          alt="poster"
          className="hover:opacity-75 transition ease-in-out duration-150"
        />
      </a>
      <div className="mt-2">
        <a
          href={`https://www.themoviedb.org/movie/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg mt-2 text-secondary-light hover:text-secondary"
        >
          {title}
        </a>
        <div className="flex items-center text-accent-light text-sm mt-1">
          <svg className="fill-current text-warning w-4" viewBox="0 0 24 24">
            <g data-name="Layer 2">
              <path
                d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                data-name="star"
              />
            </g>
          </svg>
          <span className="ml-1">{voteAverage}</span>
          <span className="mx-2">|</span>
          <span>{moment(releaseDate).format("MMMM-YYYY")}</span>
        </div>
        <div className="text-accent-light text-sm">{description}</div>
      </div>
    </div>
  );
};

export default MovieCard;
