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
      <div className={toggleTab === 1 ? "block" : "hidden"}>
        <Friends />
      </div>

      <div className={toggleTab === 2 ? "block" : "hidden"}>
        <FriendsRequest />
      </div>
    </section>
  );
};

export default FriendsTab;
