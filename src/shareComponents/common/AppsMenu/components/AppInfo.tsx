import accountingLogo from "assets/logos/accounting.png";
import biddingLogo from "assets/logos/bidding.png";
import cmcsLogo from "assets/logos/cmcs.png";
import datahubLogo from "assets/logos/datahub.png";
import documentLogo from "assets/logos/document.png";
import financialLogo from "assets/logos/financial.png";
import humanLogo from "assets/logos/human.png";
import crmLogo from "assets/logos/crm.png";
import mediaLogo from "assets/logos/media.png";
import paymentLogo from "assets/logos/payment.png";
import ownerLogo from "assets/logos/owner.png";
import fnbLogo from "assets/logos/fnb.png";
import pcmLogo from "assets/logos/pcm.png";
import projectLogo from "assets/logos/project.png";
import qrcodeLogo from "assets/logos/qrcode.png";
import storeLogo from "assets/logos/store.png";
import timesheetLogo from "assets/logos/timesheet.png";
import workshopLogo from "assets/logos/workshop.png";
import messagesLogo from "assets/logos/messages.png";
import budgetLogo from "assets/logos/budget.png";
import inspectionLogo from "assets/logos/inspection.png";
import defaultLogo from "assets/logos/default.png";

export const APP_INFO = new Map([
    /* Ứng dụng Payment */
    ['5e4785eb8b50843d34481d49', {
        key: "5e4785eb8b50843d34481d49",
        name: "Payment",
        icon: paymentLogo,
        route: '/payment/home'
    }],
    /* Ứng dụng Real Estate Exchange */
    ['5f52341f880c2f26c8df8c10', {
        key: "5f52341f880c2f26c8df8c10",
        name: "Thẻ kho",
        icon: storeLogo,
        route: '/store/home'
    }],
    /* Ứng dụng Market */
    ['61e049f6fdebf77b072d1b16', {
        key: "61e049f6fdebf77b072d1b16",
        name: "CRM",
        icon: crmLogo,
        route: '/crm/home'
    }],
    /* Ứng dụng Workshop */
    ['61e049e7fdebf77b072d1b15', {
        key: "61e049e7fdebf77b072d1b15",
        name: "Workshop",
        icon: workshopLogo,
        route: '/workshop/home'
    }],
    /* Ứng dụng Timesheet */
    ['61e049cffdebf77b072d1b14', {
        key: "61e049cffdebf77b072d1b14",
        name: "Chấm công",
        icon: timesheetLogo,
        route: '/timesheet/home'
    }],
    /* Ứng dụng Human */
    ['61e049c9fdebf77b072d1b13', {
        key: "61e049c9fdebf77b072d1b13",
        name: "Nhân sự",
        icon: humanLogo,
        route: '/human/home'
    }],
    /* Ứng dụng Accounting */
    ['61e049aefdebf77b072d1b12', {
        key: "61e049aefdebf77b072d1b12",
        name: "Kế toán",
        icon: accountingLogo,
        route: '/accounting/home'
    }],
    /* Ứng dụng Owner */
    ['61e04989fdebf77b072d1b10', {
        key: "61e04989fdebf77b072d1b10",
        name: "Quản trị viên",
        icon: ownerLogo,
        route: '/owner/home'
    }],
    /* Ứng dụng Bán hàng */
    ['61e04971fdebf77b072d1b0f', {
        key: "61e04971fdebf77b072d1b0f",
        name: "SellPose",
        icon: fnbLogo,
        route: '/fnb/home'
    }],
    /* Ứng dụng Quản lý hợp đồng */
    ['6131d6f83f4b736dc93253b2', {
        key: "6131d6f83f4b736dc93253b2",
        name: "Quản lý hợp đồng",
        icon: cmcsLogo,
        route: '/cmcs/home'
    }],
    /* Ứng dụng Datahub */
    ['60390cb12b367a1cdd9f3fb2', {
        key: "60390cb12b367a1cdd9f3fb2",
        name: "Datahub",
        icon: datahubLogo,
        route: '/datahub/home'
    }],
    /* Ứng dụng Dữ liệu đấu thầu */
    ['5fe58b7395db3c6e1534ea81', {
        key: "5fe58b7395db3c6e1534ea81",
        name: "Đấu thầu",
        icon: biddingLogo,
        route: '/bidding/home'
    }],
    /* Ứng dụng Quản lý hồ sơ văn bản */
    ['5e47867080019357cce04746', {
        key: "5e47867080019357cce04746",
        name: "Quản lý hồ sơ",
        icon: documentLogo,
        route: '/document/home'
    }],
    /* Ứng dụng Nhắn tin */
    ['5dfe4c1b51dc622100bb9d8f', {
        key: "5dfe4c1b51dc622100bb9d8f",
        name: "Nhắn tin",
        icon: messagesLogo,
        route: '/messages'
    }],
    /* Ứng dụng Quản trị tài chính */
    ['5dfe4bc751dc622100bb9d8a', {
        key: "5dfe4bc751dc622100bb9d8a",
        name: "Quản trị tài chính",
        icon: financialLogo,
        route: '/financial/home'
    }],
    /* Ứng dụng Quản lý công việc */
    ['5eabfdc72171391e5f6a0468', {
        key: "5eabfdc72171391e5f6a0468",
        name: "Quản lý công việc",
        icon: pcmLogo,
        route: '/pcm/home'
    }],
    /* Ứng dụng Quản lý dự án */
    ['5dfe4b9051dc622100bb9d89', {
        key: "5dfe4b9051dc622100bb9d89",
        name: "Quản lý dự án",
        icon: projectLogo,
        route: '/pm/home'
    }],
    /* Ứng dụng Truyền thông */
    ['5df4ce16506d9b3c587948ca', {
        key: "5df4ce16506d9b3c587948ca",
        name: "Truyền thông",
        icon: mediaLogo,
        route: '/media/home'
    }],
    /* Ứng dụng Qrcode */
    ['5f5233d0880c2f26c8df8c0c', {
        key: "5f5233d0880c2f26c8df8c0c",
        name: "Qrcode",
        icon: qrcodeLogo,
        route: '/qrcode/home'
    }],
    /* Ứng dụng Quản lý ngân sách */
    ['5fe58c9b95db3c6e1534ec78', {
        key: "5fe58c9b95db3c6e1534ec78",
        name: "Ngân sách",
        icon: budgetLogo,
        route: '/budget/home'
    }],
    /* Ứng dụng Tư vấn giám sát */
    ['5dfe4bf251dc622100bb9d8c', {
        key: "5dfe4bf251dc622100bb9d8c",
        name: "Tư vấn giám sát",
        icon: inspectionLogo,
        route: '/inspection/home'
    }],
    /* Ứng dụng Quản lý danh mục */
    ['5f5234b2880c2f26c8df8c13', {
        key: "5f5234b2880c2f26c8df8c13",
        name: "Quản lý danh mục",
        icon: defaultLogo,
        route: '/item/home'
    }],
])
