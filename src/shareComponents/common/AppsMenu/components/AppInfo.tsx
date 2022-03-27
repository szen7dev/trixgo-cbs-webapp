import accountingLogo from "assets/logos/accounting.png";
import biddingLogo from "assets/logos/bidding.png";
import cmcsLogo from "assets/logos/cmcs.png";
import datahubLogo from "assets/logos/datahub.png";
import documentLogo from "assets/logos/document.png";
import financialLogo from "assets/logos/financial.png";
import humanLogo from "assets/logos/human.png";
import marketLogo from "assets/logos/market.png";
import mediaLogo from "assets/logos/media.png";
// import npsLogo from "assets/logos/nps.png";
import operationLogo from "assets/logos/operation.png";
import ownerLogo from "assets/logos/owner.png";
import paymentLogo from "assets/logos/payment.png";
import pcmLogo from "assets/logos/pcm.png";
// import profileLogo from "assets/logos/profile.png";
import qrcodeLogo from "assets/logos/qrcode.png";
import reeLogo from "assets/logos/ree.png";
import supportLogo from "assets/logos/support.png";
import timesheetLogo from "assets/logos/timesheet.png";
import workshopLogo from "assets/logos/workshop.png";
import personalLogo from "assets/logos/personal.png";
import messagesLogo from "assets/logos/messages.png";
import defaultLogo from "assets/logos/default.png";

/* createdAt:1/13/2022, 10:49:33 PM 
* Author: TuanNV
* Danh sách App trong App Menu
*/

export const APP_INFO = new Map([
    /* Ứng dụng Operation */
    ['61e04a0dfdebf77b072d1b18', { //ok
        key: "61e04a0dfdebf77b072d1b18",
        name: "Quản lý vận hành",
        icon: operationLogo,
        route: '/operation/home'
    }],
    /* Ứng dụng Real Estate Exchange */
    ['61e04a05fdebf77b072d1b17', {//ok
        key: "61e04a05fdebf77b072d1b17",
        name: "Sàn bất động sản",
        icon: reeLogo,
        route: '/ree/home'
    }],
    /* Ứng dụng Market */
    ['61e049f6fdebf77b072d1b16', {//ok
        key: "61e049f6fdebf77b072d1b16",
        name: "Thị trường",
        icon: marketLogo,
        route: '/market/home'
    }],
    /* Ứng dụng Workshop */
    ['61e049e7fdebf77b072d1b15', {//ok
        key: "61e049e7fdebf77b072d1b15",
        name: "Workshop",
        icon: workshopLogo,
        route: '/workshop/home'
    }],
    /* Ứng dụng Timesheet */
    ['61e049cffdebf77b072d1b14', {//ok
        key: "61e049cffdebf77b072d1b14",
        name: "Quản lý chấm công",
        icon: timesheetLogo,
        route: '/timesheet/home'
    }],
    /* Ứng dụng Human */
    ['61e049c9fdebf77b072d1b13', {//OK
        key: "61e049c9fdebf77b072d1b13",
        name: "Quản lý nhân sự",
        icon: humanLogo,
        route: '/human/home'
    }],
    /* Ứng dụng Accounting */
    ['61e049aefdebf77b072d1b12', {//OK
        key: "61e049aefdebf77b072d1b12",
        name: "Kế toán",
        icon: accountingLogo,
        route: '/accounting/home'
    }],
    /* Ứng dụng Owner */
    ['61e04989fdebf77b072d1b10', {//ok
        key: "61e04989fdebf77b072d1b10",
        name: "Quản trị viên công ty",
        icon: ownerLogo,
        route: '/owner/home'
    }],
    /* Ứng dụng Payment */
    ['61e04971fdebf77b072d1b0f', {//ok
        key: "61e04971fdebf77b072d1b0f",
        name: "Payment",
        icon: paymentLogo,
        route: '/payment/home'
    }],
    /* Ứng dụng Quản lý hợp đồng */
    ['6131d6f83f4b736dc93253b2', {//ok
        key: "6131d6f83f4b736dc93253b2",
        name: "Quản lý hợp đồng",
        icon: cmcsLogo,
        route: '/cmcs/home'
    }],
    /* Ứng dụng Datahub */
    ['60390cb12b367a1cdd9f3fb2', {//ok
        key: "60390cb12b367a1cdd9f3fb2",
        name: "Datahub",
        icon: datahubLogo,
        route: '/datahub/home'
    }],
    /* Ứng dụng Dữ liệu đấu thầu */
    ['5fe58b7395db3c6e1534ea81', {//OK
        key: "5fe58b7395db3c6e1534ea81",
        name: "Đấu thầu",
        icon: biddingLogo,
        route: '/bidding/home'
    }],
    /* Ứng dụng Quản lý hồ sơ văn bản */
    ['5e47867080019357cce04746', {//OK
        key: "5e47867080019357cce04746",
        name: "Quản lý hồ sơ văn bản",
        icon: documentLogo,
        route: '/document/home'
    }],
    /* Ứng dụng Nhắn tin */
    ['5dfe4c1b51dc622100bb9d8f', {//OK
        key: "5dfe4c1b51dc622100bb9d8f",
        name: "Nhắn tin",
        icon: messagesLogo,
        route: '/messages'
    }],
    /* Ứng dụng Quản trị tài chính */
    ['5dfe4bc751dc622100bb9d8a', {//OK
        key: "5dfe4bc751dc622100bb9d8a",
        name: "Quản trị tài chính",
        icon: financialLogo,
        route: '/financial/home'
    }],
    /* Ứng dụng Quản lý dự án */
    ['5dfe4b9051dc622100bb9d89', {//OK
        key: "5dfe4b9051dc622100bb9d89",
        name: "Quản lý dự án",
        icon: pcmLogo,
        route: '/pcm/home'
    }],
    /* Ứng dụng Truyền thông */
    ['5df4ce16506d9b3c587948ca', {
        key: "5df4ce16506d9b3c587948ca",
        name: "Truyền thông",
        icon: mediaLogo,
        route: '/media/home'
    }],
    /* Ứng dụng Qrcode */
    ['5f5233d0880c2f26c8df8c0c', {//OK
        key: "5f5233d0880c2f26c8df8c0c",
        name: "Qrcode",
        icon: qrcodeLogo,
        route: '/qrcode/home'
    }],    
    /* Ứng dụng Quản lý danh mục */
    ['5f5234b2880c2f26c8df8c13', {//ok==============
        key: "5f5234b2880c2f26c8df8c13",
        name: "Quản lý danh mục",
        icon: defaultLogo,
        route: '/item/home'
    }],
]);
