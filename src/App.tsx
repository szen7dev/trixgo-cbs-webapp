import { FC, useEffect } from "react";
import OneSignalReact from "react-onesignal";

import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import "i18n/config";
import Routes from "routes";

import "react-toastify/dist/ReactToastify.css";
import "swiper/swiper.min.css";
import "styles/output.css";

import AuthRespository from 'apis/authentication';
import { useAuth } from "services/hooks/useAuth";

const queryClient = new QueryClient();

const App: FC = () => {	
  const { user } = useAuth();
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
    OneSignalReact.getUserId(async function(oneSignalWebPushID) {
      await AuthRespository.updateDevice({
        platform: 'BROWSER',
        deviceID: 'BROWSER',
        deviceName: 'BROWSER',
        registrationID: oneSignalWebPushID || '',
        oneSignalID: oneSignalWebPushID || '',
        userID: user?._id
      });
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
