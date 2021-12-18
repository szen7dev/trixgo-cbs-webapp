import { FC, useEffect } from "react";
import OneSignalReact from "react-onesignal";

import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import "i18n/config";
import Routes from "routes";

import "react-toastify/dist/ReactToastify.css";
import "swiper/swiper.min.css";
import "styles/output.css";

const queryClient = new QueryClient();

const App: FC = () => {	
	useEffect(() => {
	if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
		navigator.serviceWorker.register('/OneSignalSDKWorker.js');
	}
	OneSignalReact.init({
		appId: "79acfc09-966a-48f5-a9ea-44d90410014f",
		notifyButton: {
			enable: true,
		},
		notificationClickHandlerMatch: 'origin',
		notificationClickHandlerAction: 'focus',

		allowLocalhostAsSecureOrigin: true,
	})
	.then(e => {
    OneSignalReact.getUserId( function(oneSignalWebPushID) {
      console.log({ oneSignalWebPushID })
    });
  })
	.catch(e => console.log(e.message));
}, [])

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
    </QueryClientProvider>
  );
};

export default App;
