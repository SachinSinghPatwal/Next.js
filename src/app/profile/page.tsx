"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const getUserData = async () => {
    const res = await axios.get("/api/users/profile");
    setUserData(res.data.data);
  };
  const logout = async () => {
    await axios.post("/api/users/logout");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <h1>profile page</h1>
      <h1>
        {userData == "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${userData}`}>{userData}</Link>
        )}
      </h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
