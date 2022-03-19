export const getFileIcon = (mimeType: string) => {
    const PATH_FILE = `${process.env.PUBLIC_URL}/images/common/files`;
    let iconFile = `${PATH_FILE}/attach.png`;

    switch (mimeType) {
        case 'application/pdf':
            iconFile = `${PATH_FILE}/pdf.png`;
            break;
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.template':
            iconFile = `${PATH_FILE}/doc.png`;
            break;
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        case 'application/vnd.ms-excel.sheet.binary.macroEnabled.12':
        case 'application/vnd.ms-excel':
        case 'application/vnd.ms-excel.sheet.macroEnabled.12':
            iconFile = `${PATH_FILE}/excel.png`;
            break;
        case 'application/vnd.rar':
        case 'application/x-rar':
        case 'application/x-rar-compressed':
            iconFile = `${PATH_FILE}/rar_compress.png`;
            break;
        case 'application/vnd.ms-powerpoint':
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        case 'application/vnd.openxmlformats-officedocument.presentationml.template':
        case 'application/vnd.openxmlformats-officedocument.presentationml.slideshow':
            iconFile = `${PATH_FILE}/powerpoint.png`;
            break;
        case 'application/vnd.ms-access':
        case 'application/x-msaccess':
        case 'application/vnd.msaccess':
        case 'application/x-mdb':
        case 'application/mdb':
            iconFile = `${PATH_FILE}/access.png`;
            break;
        case 'application/zip':
            iconFile = `${PATH_FILE}/zip.png`;
            break;
        case 'text/plain':
            iconFile = `${PATH_FILE}/txt.png`;
            break;
        default:
            break;
    }

    return iconFile;
}