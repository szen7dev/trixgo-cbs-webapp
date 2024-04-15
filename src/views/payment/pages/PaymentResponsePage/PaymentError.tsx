import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

export const PaymentErrorPage: FC = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    return (
        <div className="bg-gray-100 h-screen w-screen flex justify-center items-center">
            <div className="bg-white p-8 w-1/3 md:mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-red-600 w-20 h-20 mx-auto my-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Payment Failed!
                    </h3>
                    <p className="text-gray-600 my-2 mb-6">
                        {query.get('msg')}
                    </p>
                    <NavLink to="/fnb/home" className="bg-cbs-primary rounded text-white font-semibold py-3 px-4">
                        GO BACK FNB ORDER
                    </NavLink>
                </div>
            </div>
        </div>
    )
}