import axios from "axios";
import AWS from "aws-sdk";

import { updateUser } from "./UserService";

// this variable is set to easily change everything at once
// buradaki her sey file icinde farkli noktalarda gectigi
// ve gelistirme asamasinda 1233234 farkli yontem denedigim icin her sey cok karisiyordu, sonrasinda silinebilir :"")
const config = {
  bucketName: "placeholder-file-bucket",
  region: "eu-central-1",
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  //   signatureVersion: "v4",
};

AWS.config.update({
  region: config.region, // Put your aws region here
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
});

const s3Bucket = new AWS.S3({
  params: { Bucket: config.bucketName },
  region: config.region,
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  signatureVersion: "v4",
});

export const uploadPicture = (file, type, setEdited, setState) => {
  const params = {
    ACL: "public-read",
    Key: file.name,
    ContentType: file.type,
    Body: file,
  };
  s3Bucket
    .putObject(params)
    // register callbacks on request to retrieve response data
    .on("success", function (response) {
      console.log(response.data.location);
    })
    .on("httpUploadProgress", (evt) => {
      // that's how you can keep track of your upload progress
      console.log("%", Math.round((evt.loaded / evt.total) * 100));
      //   setState({
      //     progress: Math.round((evt.loaded / evt.total) * 100),
      //   });
    })
    .send((err) => {
      if (err) {
        // handle the error here
        console.log("error s3: ", err);
      }
    });
};

// export function uploadPicture(file, type, setEdited) {
//   console.log("uploaded file: ", file);
//   S3FileUpload.uploadFile(file, { ...config, dirName: "/profile-pics" })
//     .then((data) => {
//       //TODO: change proflePic to type and see if it works
//       console.log("s3 data:", data.location);
//       //   updateUser({ profilePic: data.location }).then((response) => {
//       //     if (response.data.code === 200) {
//       //       console.log("File uploaded to server!");
//       //       setEdited(true);
//       //     } else {
//       //       alert("We had a problem uploading your file");
//       //     }
//       //   });
//     })
//     .catch((error) => {
//       alert("S3 Had an Error: ", error);
//     });
// }
