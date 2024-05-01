/**
 * Libraries
 */
import { FC } from "react";

/**
 * Components, Assets
 */
import CloseIcon from "assets/images/icon-small-bold-close.svg";
import { ModalContainer } from "shareComponents/common";
import { CircularProgress } from "@mui/material";
import { nonAccentVietnamese } from "utils/string";

type Props = {
  isToggle: boolean;
  toggle: () => void;
  paymentInfo: Record<string, any>;
}

export const ModalQRPayment: FC<Props> = ({ isToggle, toggle, paymentInfo }) => {
    // useEffect(() => {
    //     const fetchVietQR = async () => {
    //         try {
    //             const response = await API.post(`https://api.vietqr.io/v2/generate`, {
    //                 accountNo: '',
    //                 accountName: '',
    //                 acqId: '',
    //                 amount: paymentInfo.amount,
    //                 addInfo: paymentInfo.description,
    //                 template: '2stpbWM'
    //             }, {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'x-client-id': process.env.REACT_APP_VIETQR_CLIENT_ID,
    //                     'x-api-key': process.env.REACT_APP_VIETQR_API_KEY,
    //                 }
    //             })
    //             console.log({ response });

    //         } catch (error: any) {
    //             toast.error(error.message);
    //         }
    //     }
    // }, [paymentInfo])

  return (
    <ModalContainer isModalOpen={isToggle} toggle={toggle}>
      <div className="inline-flex flex-col text-black max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-md" style={{ minWidth: '300px', minHeight: '300px' }}>
        <main className="mb-5 ml-6 mr-6">
          <header className="py-5 flex items-center w-full justify-between">
            <p className="font-bold text-xl">
              QR Code
            </p>
            <img
              src={CloseIcon}
              alt="Close"
              className="cursor-pointer"
              onClick={toggle}
            />
          </header>
            {(!Object.keys(paymentInfo).length) ? (
                <div className="flex justify-center items-center" style={{ minWidth: '250px', minHeight: '250px' }}>
                    <CircularProgress />
                </div>
            ) : (
                <img
                    src={`https://api.vietqr.io/image/970423-0828912491-2stpbWM.jpg?amount=${paymentInfo.amount}&addInfo=${nonAccentVietnamese(paymentInfo.description)}`}
                    alt="QR"
                    style={{ maxWidth: '80vw', maxHeight: '80vh' }}
                />
            )}
        </main>
      </div>
    </ModalContainer>
  );
};