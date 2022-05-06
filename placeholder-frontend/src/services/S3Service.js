// import dotenv from "dotenv";
// import { uploadFile } from "react-s3";
import S3FileUpload from "react-s3";
import { updateUser } from "./UserService";
// import { Buffer } from "buffer";
window.Buffer = window.Buffer || require("buffer").Buffer;
const config = {
  bucketName: "placeholder-file-bucket",
  region: "eu-central-1",
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  //   signatureVersion: "v4",
};

export function uploadPicture(file, type, setEdited) {
  console.log("uploaded file: ", file);
  S3FileUpload.uploadFile(file, { ...config, dirName: "/profile-pics" })
    .then((data) => {
      //TODO: change proflePic to type and see if it works
      console.log("s3 data:", data.location);
      //   updateUser({ profilePic: data.location }).then((response) => {
      //     if (response.data.code === 200) {
      //       console.log("File uploaded to server!");
      //       setEdited(true);
      //     } else {
      //       alert("We had a problem uploading your file");
      //     }
      //   });
    })
    .catch((error) => {
      alert("S3 Had an Error: ", error);
    });
}
