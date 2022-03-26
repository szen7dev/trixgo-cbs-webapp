import API from "apis/repository";
import { createBrowserHistory } from "history";
import { toast } from "react-toastify";

export const history = createBrowserHistory();

const SetupInterceptors = (history: any) => {

    API.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if(error?.response?.data?.message === 'user_blocked') {
            return history.push('/login');
        }

        console.error(error);
        console.info(error.message);
        toast.error(error?.response?.data?.message);
        return error.response;
    });
}

export default SetupInterceptors;