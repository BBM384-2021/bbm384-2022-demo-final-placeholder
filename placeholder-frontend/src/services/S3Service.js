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

export const ROOT_S3_URL =
  "https://placeholder-file-bucket.s3.eu-central-1.amazonaws.com/";

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

export const uploadPicture = (file, type, user, setState, state) => {
  // for postVisualData:
  //  if it's a first upload we assign a random id to the picture,
  //  if that's an update we use postID
  const urlKey =
    type === "postVisualData"
      ? state.postKey
        ? "" + state.postKey
        : "generated" + Math.floor(Math.random() * 100)
      : user.id + type;
  const params = {
    ACL: "public-read",
    Key: urlKey,
    ContentType: file.type,
    Body: file,
  };
  s3Bucket
    .putObject(params)
    // register callbacks on request to retrieve response data
    .on("success", function (response) {
      const customUrl = ROOT_S3_URL + params.Key;
      switch (type) {
        case "profilePic":
          updateUser({ user: user, profilePic: customUrl }).then((response) => {
            if (response.data.code === 200) {
              console.log("Profile Picture uploaded to server!", customUrl);
              setState({ ...state, profilePic: customUrl });

              localStorage.setItem(
                "user",
                JSON.stringify({
                  ...user,
                  profile_pic_path: customUrl,
                })
              );
            } else {
              alert("We had a problem uploading your file");
            }
          });
          setState({ ...state, isLoading: false, value: 0 });

          break;
        case "coverUrl":
          updateUser({ user: user, coverUrl: customUrl }).then((response) => {
            if (response.data.code === 200) {
              console.log("Cover Photo uploaded to server!", customUrl);
              setState({ ...state, coverPic: customUrl });
              localStorage.setItem(
                "user",
                JSON.stringify({
                  ...user,
                  cover_url: customUrl,
                })
              );
            } else {
              alert("We had a problem uploading your file");
            }
          });
          break;
        case "postVisualData":
          console.log("postVisualData Uploaded to S3: ", customUrl);

          setState({ ...state, postVisualData: undefined });
          // updateUser({ user: user, coverUrl: customUrl }).then((response) => {
          //   if (response.data.code === 200) {
          //     console.log("Cover Photo uploaded to server!");
          //     setState({ ...state, coverPic: customUrl });
          //     localStorage.setItem(
          //       "user",
          //       JSON.stringify({
          //         ...user,
          //         cover_url: customUrl,
          //       })
          //     );
          //   } else {
          //     alert("We had a problem uploading your file");
          //   }
          // });
          break;

        default:
          break;
      }
      //https://placeholder-file-bucket.s3.eu-central-1.amazonaws.com/481profilePic
    })
    .on("httpUploadProgress", (evt) => {
      // that's how you can keep track of your upload progress
      setState({
        ...state,
        isLoading: true,
        value: Math.round((evt.loaded / evt.total) * 100),
      });
    })
    .send((err) => {
      if (err) {
        // handle the error here
        console.log("error s3: ", err);
      }
    });
  setState({ ...state, isLoading: false, value: 0 });
  //   setEdited(true);
};
