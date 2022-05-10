import React from "react";
import ProfileBanner from "../commons/ProfileBanner";

export default function ChatHeader({ user }) {
  // return <div>Header</div>
  console.log("chat header: ", user);
  return <ProfileBanner user={user} contentType="chatHeader"></ProfileBanner>;
}
