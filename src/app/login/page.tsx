"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  async function login() {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login success", response.data);
      toast.success("Login successfully");
      if (response.data.success) router.push("/");
    } catch (error: any) {
      console.log("failed to signup");
      toast.error(error.message);
    }
  }
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [user]);
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-5 ">
        <h1>{loading ? "processing...." : "Login"}</h1>
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="border p-2 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="border p-2 rounded-lg"
        />
        <button
          onClick={login}
          disabled={disableButton}
          className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200"
        >
          login
        </button>
        <Link href="/signup" className="text-blue-500 underline">
          Dont have an account? Signup
        </Link>
      </div>
    </div>
  );
}
