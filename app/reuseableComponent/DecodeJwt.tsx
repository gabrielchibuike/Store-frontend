// import { jwtDecode } from "jwt-decode";

// export const DecodeJwt = async () => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("Access_Token");

//     if (token) {
//       try {
//         const decoded: any = jwtDecode(token);
//         const currentTime = Date.now() / 1000;

//         if (decoded.exp < currentTime) {
//           console.log("Token expired");
//           return null;
//         }

//         return decoded;
//       } catch (error) {
//         console.error("Invalid token", error);
//         return null;
//       }
//     }
//   }
//   return null;
// };
