const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

export const abbreviateNumber = (number = 0): string => {
  // what tier? (determines SI symbol)
  const tier = Math.log10(Math.abs(number)) / 3 | 0;

  // if zero, we don't need a suffix
  if (+tier === 0) return `${number}`;

  // get suffix and determine scale
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);

  // scale the number
  const scaled = number / scale;

  // format number and add suffix
  return scaled.toFixed(1) + suffix;
};

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
export const humanFileSize = (bytes = 0, si = true, dp = 1) => {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
};

/**
 * Convert Blob to File again
 */
export const blobToFile = (theBlob: Blob, fileName: string): File => {
  const b: any = theBlob;
  // A Blob() is almost a File() - it's just missing the two properties below which we will add
  b.lastModified = Date.now();
  b.lastModifiedDate = new Date();
  b.name = fileName;

  // Cast to a File() type
  return <File> theBlob;
};

export const formatNumberMoney = (number: number | string): string => {
  // 'de-DE'
  // return (Number(number || 0).toLocaleString('en-US')) || "" // EN
  return (Number(number || 0).toLocaleString("it-IT")) || ""; // VN
};

export const formatNaNToZero = (number: number): number => {
  if (!number || isNaN(number)) {
    return 0;
  }

  return number;
};

export const convertCurrency = (number: string | number = 0): string => {
  if (typeof number === "string" && number.search(",")) {
    number = number.replaceAll(",", "");
  }

  const formatter = new Intl.NumberFormat("en-US");
  // const formatter = new Intl.NumberFormat('vi-VN');
  return formatter.format(+number);
};

export const convertCurrencyToNumber = (currency: string): number => {
  return +currency.replaceAll(",", "");
};

export const formatCurrency = (value: number): string => {
  return value.toLocaleString("vi-VN");
};
