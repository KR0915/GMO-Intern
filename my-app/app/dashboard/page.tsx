"use client";

import React from 'react';
import Service from '../components/Service';  // Serviceコンポーネントをインポート
import Header from '../components/Header'; // Headerコンポーネントをインポート
import Sidebar from '../components/Sidebar'; // Sidebarコンポーネントをインポート
import MoneySidebar from '../components/MoneySidebar';

export default function Home() {
    return (
        <div className="h-screen flex flex-col bg-custom-bg bg-cover bg-custom-right-bottom bg-fixed overflow-y-auto">
            <Header />
            <div className="grid grid-cols-5 flex-1">
                <Sidebar />
                <div className="col-span-3">
                    <Service />
                </div>
                <MoneySidebar />
            </div>
        </div>
    );
}