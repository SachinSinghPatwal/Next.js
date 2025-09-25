"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState("nothing");
  const getUserData = async () => {
    try {
      const res = await axios.post("/api/users/profile");
      console.log(res);
      setUserData(res.data.data._id);
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="grid items-center justify-center content-center h-screen">
      <h1 className="text-center">profile page</h1>
      <h1 className="text-center">
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
