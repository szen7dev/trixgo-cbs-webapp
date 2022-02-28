import {useEffect} from "react";
import {useAuth} from "services/hooks/useAuth";

export const OneSignalController = () => {
    const { hasAuthenticated , updateDevice , user } = useAuth();
    useEffect(() => {
        if (hasAuthenticated&&user) {
            updateDevice(user?._id);
        }
    }, [hasAuthenticated])
    return null
}