import { FC } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";

import "i18n/config";
import Routes from "routes";

import "react-toastify/dist/ReactToastify.css";
import "swiper/swiper.min.css";
import "styles/output.css";

const queryClient = new QueryClient();

const App: FC = () => {
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

      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default App;
