import accountingLogo from "assets/logos/accounting.png";
import biddingLogo from "assets/logos/bidding.png";
import cmcsLogo from "assets/logos/cmcs.png";
import datahubLogo from "assets/logos/datahub.png";
import documentLogo from "assets/logos/document.png";
import financialLogo from "assets/logos/financial.png";
import humanLogo from "assets/logos/human.png";
import marketingLogo from "assets/logos/marketing.png";
import mediaLogo from "assets/logos/media.png";
// import npsLogo from "assets/logos/nps.png";
import operationLogo from "assets/logos/operation.png";
import ownerLogo from "assets/logos/owner.png";
import paymentLogo from "assets/logos/payment.png";
import pcmLogo from "assets/logos/pcm.png";
// import profileLogo from "assets/logos/profile.png";
// import qrcodeLogo from "assets/logos/qrcode.png";
import reeLogo from "assets/logos/ree.png";
import supporterLogo from "assets/logos/supporter.png";
import timesheetLogo from "assets/logos/timesheet.png";
import workshopLogo from "assets/logos/workshop.png";
import defaultLogo from "assets/logos/default.png";

/* createdAt:1/13/2022, 10:49:33 PM 
* Author: TuanNV
* Danh sách App trong App Menu
*/

export const APP_INFO = new Map([
    /* Ứng dụng Operation */
    ['61e04a0dfdebf77b072d1b18', {
        name: "Operation",
        icon: operationLogo,
        route: '/operation/home'
    }],
    /* Ứng dụng Real Estate Exchange */
    ['61e04a05fdebf77b072d1b17', {
        name: "Real Estate Exchange",
        icon: defaultLogo,
        route: '/marketing/home'
    }],
    /* Ứng dụng Marketing */
    ['61e049f6fdebf77b072d1b16', {
        name: "Marketing",
        icon: marketingLogo,
        route: '/marketing/home'
    }],
    /* Ứng dụng Training */
    ['61e049e7fdebf77b072d1b15', {
        name: "Marketing",
        icon: defaultLogo,
        route: '/training/home'
    }],
    /* Ứng dụng Timesheet */
    ['61e049cffdebf77b072d1b14', {
        name: "Quản lý chấm công",
        icon: timesheetLogo,
        route: '/timesheet/home'
    }],
    /* Ứng dụng Human */
    ['61e049c9fdebf77b072d1b13', {
        name: "Nhân sự",
        icon: humanLogo,
        route: '/human/home'
    }],
    /* Ứng dụng Accounting */
    ['61e049aefdebf77b072d1b12', {
        name: "Kế toán",
        icon: accountingLogo,
        route: '/accounting/home'
    }],
    /* Ứng dụng Supporter */
    ['61e0499efdebf77b072d1b11', {
        name: "Timesheet",
        icon: supporterLogo,
        route: '/supporter/home'
    }],
    /* Ứng dụng Owner */
    ['61e04989fdebf77b072d1b10', {
        name: "Owner",
        icon: ownerLogo,
        route: '/owner/home'
    }],
    /* Ứng dụng Payment */
    ['61e04971fdebf77b072d1b0f', {
        name: "Payment",
        icon: paymentLogo,
        route: '/payment/home'
    }],
    /* Ứng dụng Quản lý chi phí */
    ['6131d6f83f4b736dc93253b2', {
        name: "Quản lý chi phí",
        icon: financialLogo,
        route: '/'
    }],
    /* Ứng dụng Datahub */
    ['60390cb12b367a1cdd9f3fb2', {
        name: "Datahub",
        icon: datahubLogo,
        route: '/datahub/home'
    }],
    /* Ứng dụng Quản lý dự án */
    ['5fe58c9b95db3c6e1534ec78', {
        name: "Quản lý dự án",
        icon: pcmLogo,
        route: '/pcm/home'
    }],
    /* Ứng dụng Dữ liệu đấu thầu */
    ['5fe58b7395db3c6e1534ea81', {
        name: "Đấu thầu",
        icon: biddingLogo,
        route: '/bidding/home'
    }],
    /* Ứng dụng Quản lý danh mục */
    ['5f5234b2880c2f26c8df8c13', {
        name: "Quản lý danh mục",
        icon: documentLogo,
        route: '/'
    }],
    /* Ứng dụng Ghi chú */
    ['5f52341f880c2f26c8df8c10', {
        name: "Ghi chú",
        icon: defaultLogo,
        route: '/'
    }],
    /* Ứng dụng Quản lý thị trường */
    ['5f5233d0880c2f26c8df8c0c', {
        name: "Quản lý thị trường",
        icon: defaultLogo,
        route: '/'
    }],
    /* Ứng dụng Quản lý chấm công */
    ['5eabfdc72171391e5f6a0468', {
        name: "Quản lý chấm công",
        icon: defaultLogo,
        route: '/'
    }],
    /* Ứng dụng Quản lý hồ sơ văn bản */
    ['5e47867080019357cce04746', {
        name: "Quản lý hồ sơ văn bản",
        icon: documentLogo,
        route: '/'
    }],
    /* Ứng dụng Quản lý hợp đồng */
    ['5e4785eb8b50843d34481d49', {
        name: "Quản lý hợp đồng",
        icon: cmcsLogo,
        route: '/cmcs/home'
    }],
    /* Ứng dụng Cộng đồng doanh nghiệp */
    ['5e0475825e30dce72849a489', {
        name: "Cộng đồng doanh nghiệp",
        icon: workshopLogo,
        route: '/'
    }],
    /* Ứng dụng Nhắn tin */
    ['5dfe4c1b51dc622100bb9d8f', {
        name: "Nhắn tin",
        icon: defaultLogo,
        route: '/messages'
    }],
    /* Ứng dụng Quản lý hành chính */
    ['5dfe4bf251dc622100bb9d8c', {
        name: "Quản lý hành chính",
        icon: defaultLogo,
        route: '/'
    }],
    /* Ứng dụng Quản trị tài chính */
    ['5dfe4bc751dc622100bb9d8a', {
        name: "Quản trị tài chính",
        icon: financialLogo,
        route: '/'
    }],
    /* Ứng dụng Quản lý công việc */
    ['5dfe4b9051dc622100bb9d89', {
        name: "Quản lý công việc",
        icon: pcmLogo,
        route: '/pcm/home'
    }],
    /* Ứng dụng Truyền thông nội bộ */
    ['5df4ce16506d9b3c587948ca', {
        name: "Truyền thông nội bộ",
        icon: mediaLogo,
        route: '/media/home'
    }]
]);
