import { FC } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";

import "i18n/config";
import Routes from "routes";
import "react-datepicker/dist/react-datepicker.min.css";
import "react-toastify/dist/ReactToastify.css";
import "swiper/swiper.min.css";
import "styles/output.css";
import { DeleteConfirm } from "./shareComponents/common";

const queryClient = new QueryClient();

const App: FC = () => {
  // console.info(
  //   '%c ',
  //   `line-height:200px;padding-block:100px;padding-left:200px;background-repeat:no-repeat;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cstyle%3E .wrapper %7B font-family: sans-serif; perspective: 500px; text-align: center; position: relative; width: 100%25; height: 100%25; %7D .cube %7B position: absolute; top: 20%25; left: 30%25; transform-style: preserve-3d; transform: rotateY(40deg) rotateX(-40deg); animation: wiggle_wiggle_wiggle_wiggle_wiggle_yeah 3s ease-in-out infinite alternate; %7D .side %7B width: 8rem; height: 8rem; background: rgba(0, 0, 0, 0.8); display: inline-block; position: absolute; line-height: 8rem; color: %23fff; text-align: center; box-sizing: border-box; border: 3px solid %23f00; font-size: 4rem; %7D .front %7B transform: translateZ(4rem); z-index: 1; %7D .back %7B transform: rotateY(180deg) translateZ(4rem); %7D .left %7B transform: rotateY(-90deg) translateZ(4rem); z-index: 1; %7D .right %7B transform: rotateY(90deg) translateZ(4rem); %7D .top %7B transform: rotateX(90deg) translateZ(4rem); %7D .bottom %7B transform: rotateX(-90deg) translateZ(4rem); %7D @keyframes wiggle_wiggle_wiggle_wiggle_wiggle_yeah %7B 0%25 %7B transform: rotateY(15deg) rotateX(-15deg); %7D 100%25 %7B transform: rotateY(60deg) rotateX(-45deg); %7D %7D %3C/style%3E%3CforeignObject width='100%25' height='100%25'%3E%3Cdiv xmlns='http://www.w3.org/1999/xhtml' class='wrapper'%3E%3Cdiv class='cube'%3E%3Cdiv class='side front'%3E1%3C/div%3E%3Cdiv class='side back'%3E6%3C/div%3E%3Cdiv class='side left'%3E3%3C/div%3E%3Cdiv class='side right'%3E4%3C/div%3E%3Cdiv class='side top'%3E2%3C/div%3E%3Cdiv class='side bottom'%3E5%3C/div%3E%3C/div%3E%3C/div%3E%3C/foreignObject%3E%3C/svg%3E")`
  // );
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ReactQueryDevtools initialIsOpen={false} />
      <DeleteConfirm />
    </QueryClientProvider>
  );
};

export default App;
