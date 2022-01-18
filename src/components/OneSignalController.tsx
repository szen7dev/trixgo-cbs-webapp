import React, {useEffect, useReducer} from "react";
import {useAuth} from "../services/hooks/useAuth";

const OneSignalController = () => {
    const { hasAuthenticated , updateDevice , user } = useAuth();
    useEffect(() => {
        if (hasAuthenticated) {
            updateDevice();
        }
    },[hasAuthenticated])
    return null
}
export default OneSignalController
