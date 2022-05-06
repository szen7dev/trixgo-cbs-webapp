/**
 * Libraries
 */
import { FC, useCallback } from "react";
import QRCode from "react-qr-code";

/**
 * Components, Assets
 */
import CloseIcon from "assets/images/icon-small-bold-close.svg";
import { ModalContainer } from "shareComponents/common";

type Props = {
  isToggle: boolean;
  toggle: () => void;
  value: {
    appID: string,
    id: string
  };
}

export const ModalQRCode: FC<Props> = ({ isToggle, toggle, value }) => {

  const downloadQR = useCallback(() => {
    const svg: any = document.getElementById("qrcode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx: any = canvas.getContext("2d");
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = "qrcode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  }, [value]);

  return (
    <ModalContainer isModalOpen={isToggle} toggle={toggle}>
      <div className="inline-flex flex-col text-black max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-md">
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
          <QRCode id="qrcode" value={JSON.stringify(value)} size={350} />

          <div className="flex justify-end mt-5">
            <div>
              <button
                onClick={downloadQR}
                className="bg-primary text-primary-light text-base w-24 h-8 rounded"
              >
                Tải xuống
              </button>
            </div>
          </div>

        </main>
      </div>
    </ModalContainer>
  );
};