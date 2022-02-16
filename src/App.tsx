import { FC } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from 'react-query/devtools'

import "i18n/config";
import Routes from "routes";

import "react-toastify/dist/ReactToastify.css";
import "swiper/swiper.min.css";
import "styles/output.css";
import OneSignalController from "components/OneSignalController";
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
      <OneSignalController/>
			<ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
