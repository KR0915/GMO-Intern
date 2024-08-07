"use client";

import React from 'react';
import Service from '../components/Service';  // Serviceコンポーネントをインポート
import Header from '../components/Header'; // Headerコンポーネントをインポート
import Sidebar from '../components/Sidebar'; // Sidebarコンポーネントをインポート
import MoneySidebar from '../components/MoneySidebar';

export default function Home() {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="grid grid-cols-5 flex-1">
                <Sidebar />
                <Service />
                <MoneySidebar />
            </div>
        </div>
    );
}
