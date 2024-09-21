// import CryptoJS from 'crypto-js';
// /**
//  *加密处理
//  */
// export const encryption = (option: { data: any; key: string; type?: string; param: string[] }) => {
//   const { data, type, param, key } = option;
//   const result = JSON.parse(JSON.stringify(data));
//   if (type === 'Base64') {
//     param.forEach((ele) => {
//       result[ele] = btoa(result[ele]);
//     });
//   } else {
//     param.forEach((ele) => {
//       const item = result[ele];
//       const enKey = CryptoJS.enc.Latin1.parse(key);
//       const iv = enKey;
//       // 加密
//       const encrypted = CryptoJS.AES.encrypt(item, enKey, {
//         iv: iv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.ZeroPadding,
//       });
//       result[ele] = encrypted.toString();
//     });
//   }
//   return result;
// };
