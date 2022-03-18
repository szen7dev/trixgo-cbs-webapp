import { FC } from "react";

import { ListFriends } from "../ListFriends";
import { FriendsRequest } from "../FriendsRequest";

type Props = {
  toggleTab: number;
};

export const FriendsTab: FC<Props> = (props) => {
  const { toggleTab } = props;

  return (
    <section>
      {toggleTab === 1 ?
        <div>
          <ListFriends />
        </div>
        : null
      }
      {toggleTab === 2 ?
        <div>
          <FriendsRequest />
        </div>
        : null
      }
    </section>
  );
};
