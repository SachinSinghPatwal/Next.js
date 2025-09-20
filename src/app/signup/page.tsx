"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [disableButton, setDisableButton] = useState(true);

  const [loading, setLoading] = useState(false);

  async function signUp() {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      toast.success("Sign up successfully");
      if (response.data.success) router.push("/login");
    } catch (error: any) {
      console.log("failed to signup");
      toast.error(error.message);
    }
  }
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [user]);

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-5 ">
        <h1>{loading ? "processing...." : "Sign Up"}</h1>
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="border p-2 rounded-lg"
        />
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
          onClick={signUp}
          disabled={disableButton}
          className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200"
        >
          Sign Up
        </button>
        <Link href="/login" className="text-blue-500 underline">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
