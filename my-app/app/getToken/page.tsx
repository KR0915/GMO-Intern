"use client"

import { useState } from "react";

export default function Page() {
    const [token, setToken] = useState("");

    async function getToken() {
        const res = await fetch("/api/gettoken?user=****");
        const token = await res.json();
        setToken(token);
    }

    return <div className="text-center mt-8">
        <button className="p-2" onClick={getToken}>
            button
        </button>
        <p>{token}</p>
    </div>
}