import { useInfiniteQuery } from "react-query";
import SupportRepository from "apis/support";
import {useEffect, useState} from "react";
import { ListDevicePayload, ListDeviceResponse, ListDeviceProps, SupportProps } from 'typings/support';
import {PcmPlanTaskProps} from "../../typings/pcm";

type UseSupport = {
    listDevices: number,
}
export const useSupport = () : UseSupport => {
    const [deviceAccess, setDeviceAccess] = useState<ListDeviceProps>();
    const [type, setType] = useState(1);
    const filterDate = {
        fromDate: '2021-12-30',
        toDate: '2021-12-30'
    };
    useEffect(() => {
        (async () => {
            const response = await SupportRepository.listDeviceAccess(filterDate);
            setDeviceAccess(response.data);
        })();
    }, [type])
    return {
        listDevices
    };
};
