"use client";

import React, { useState } from 'react';
import Service from '../components/Service';  // Serviceコンポーネントをインポート
import Header from '../components/Header'; // Headerコンポーネントをインポート
import Sidebar from '../components/Sidebar'; // Sidebarコンポーネントをインポート
import MoneySidebar from '../components/MoneySidebar'; // MoneySidebarコンポーネントをインポート

export default function Home() {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);

    return (
        <div className="h-screen flex flex-col bg-custom-bg bg-cover bg-custom-right-bottom bg-fixed overflow-y-auto">
            <Header />
            <div className="flex-1 grid grid-cols-5">
                {/* 各コンポーネントの比率を1:3:1に設定 */}
                <div className="col-span-1">
                    <Sidebar />
                </div>
                <div className="col-span-3">
                    <Service setSelectedPlan={setSelectedPlan} setSelectedPrice={setSelectedPrice} />
                </div>
                <div className="col-span-1">
                    <MoneySidebar plan={selectedPlan} price={selectedPrice} />
                </div>
            </div>
        </div>
    );
}
