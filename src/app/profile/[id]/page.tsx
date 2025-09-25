"use client";
import React, { use } from "react";

export default function Page({ params }: any) {
  const { id }: { id: string } = use(params);
  return (
    <div className="grid justify-center items-center content-center gap-5 h-screen">
      <h1 className="text-center">params page</h1>
      <h1 className="text-center">{id}</h1>
    </div>
  );
}
