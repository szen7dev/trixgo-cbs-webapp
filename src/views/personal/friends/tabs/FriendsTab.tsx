import { FC } from "react";

import Friends from "../components/Friends";
import FriendsRequest from "../components/FriendsRequest";

type Props = {
  toggleTab: number;
};

const FriendsTab: FC<Props> = (props) => {
  const { toggleTab } = props;

  return (
    <section>
      {toggleTab === 1 ?
        <div className={toggleTab === 1 ? "block" : "hidden"}>
          <Friends />
        </div>
        : null
      }
      {toggleTab === 2 ?
        <div className={toggleTab === 2 ? "block" : "hidden"}>
          <FriendsRequest />
        </div>
        : null
      }
    </section>
  );
};

export default FriendsTab;
