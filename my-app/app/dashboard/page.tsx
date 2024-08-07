"use client";

import React from 'react';
import Service from '../components/Service';  // Serviceコンポーネントをインポート
import Header from '../components/Header'; // Headerコンポーネントをインポート
import Sidebar from '../components/Sidebar'; // Sidebarコンポーネントをインポート

export default function Home() {
    return (
        <div>
            <Header />
            <div className="flex">
                <Sidebar />
            <main className="flex-1">
                <Service />
            </main>
            </div>
    </div>
    );
}
