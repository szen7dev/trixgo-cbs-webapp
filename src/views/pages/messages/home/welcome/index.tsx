import { FC } from "react";

const WelcomeChatting: FC = () => {
  return (
    <section className="welcome-chatting-height flex justify-center items-center">
      <div className="w-96 text-center mb-12">
        <h1>
          Chào mừng đến với <strong>CBS web app!</strong>
        </h1>

        <p>
          Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân,
          bạn bè được tối ưu cho bạn.
        </p>
      </div>
    </section>
  );
};

export default WelcomeChatting;
