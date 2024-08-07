"use client";

import { useState } from "react";

export default function Page() {
  const [token, setToken] = useState("");
  const [item2, setItem2] = useState("");

  async function getToken() { 
    const res = await fetch("/api/gettoken");
    const token = await res.json();
    setToken(token);
  }

  async function getVolumeID() {
    const res = await fetch("/api/getvolumeid?user=****", {
      method: "POST",
      body: JSON.stringify({
        size: 500,
        volume_type: "c3j1-ds02-boot",
      }),
    });
    const item2 = await res.json();
    setItem2(JSON.stringify(item2));
  }

  return (
    <div className="text-center mt-8">
      <div>
      <button className="p-2" onClick={getToken}>
        getToken
      </button>
      <p>{token}</p>
      </div>
      <button className="p-2" onClick={getVolumeID}>
        button2
      </button>
      <p>{item2}</p>
    </div>
  );
}
