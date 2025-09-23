"use client";
import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  // const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/verify-email", { token });
      setVerified(true);
      setError(false);
    } catch (error) {
      setError(true);
      console.log("Error verifying email:", error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=");
    setToken(urlToken[1] || "");
    console.log("Token from URL:", urlToken[1]);
    // const { query } = router;
    // const urlToken = query.token;
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="grid place-items-center h-screen text-center">
      {verified ? (
        <div>
          {" "}
          <h2 className="mb-10">Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      ) : error ? (
        <div>
          <h2 className="mb-10">Error verifying email.</h2>
          <p>{token}</p>
        </div>
      ) : (
        "Verifying email..."
      )}
    </div>
  );
}
