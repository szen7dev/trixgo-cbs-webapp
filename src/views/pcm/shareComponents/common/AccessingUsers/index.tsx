import { FC } from "react";
import uniqBy from "lodash/uniqBy";
import { User } from "typings/user";

type Props = {
  users: Array<User>;
  small?: boolean
};

export const AccessingUsers: FC<Props> = ({ users, small = false }) => {
  const userSlice = uniqBy(users.slice(0, 4), '_id');
  const userLeft = users.length - 4;

  return (
    <div className="flex items-center">
      {userSlice.map((user, index) => (
        <img
        key={`${index}-${user._id}`}
          title={user.bizfullname}
          src={user.image ? `${process.env.REACT_APP_URL_S3_USER}/${user.image}` : '/images/common/thumbnail.png'}
          alt="Thumbnail"
          className={`rounded-full border-2 border-pink-600 mr-1 ${small ? "w-6 h-6" : "w-8 h-8"}`}
        />
      ))}
      {userLeft > 0 ? (
        <div
          className={
            `rounded-full bg-gray-300 text-white text-lg text-center items-center justify-center flex font-thin ${small ? "w-6 h-6" : "w-8 h-8"}`
          }
        >
          <span>+{userLeft}</span>
        </div>
      ) : null}
    </div>
  );
};