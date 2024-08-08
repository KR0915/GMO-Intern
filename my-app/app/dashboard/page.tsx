"use client";

import React, { useState, useCallback } from 'react';
import Service from '../components/Service';  // Serviceコンポーネントをインポート
import Header from '../components/Header'; // Headerコンポーネントをインポート
import Sidebar from '../components/Sidebar'; // Sidebarコンポーネントをインポート
import MoneySidebar from '../components/MoneySidebar'; // MoneySidebarコンポーネントをインポート
import Option from '../components/option';

export default function Home() {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
    const [jsonData, setJsonData] = useState<any>(null);
    //var jsonData = { key: "value" }; // 例として固定値を使用

    const handleSetSelectedPlan = (plan: string | null) => {
        setSelectedPlan(plan);
    };

    const handleSetSelectedPrice = (price: number | null) => {
        setSelectedPrice(price);
    };

    const sendJsonData = useCallback((data: any) => {
        console.log("Received JSON data in parent component:", data);
        //jsonData = data;
        setJsonData(data);
        console.log(data.imageRef);
        // 必要に応じてここでデータを処理
    },[]);
    

    return (
        <div className="min-h-screen flex flex-col bg-custom-bg bg-cover bg-custom-right-bottom bg-fixed overflow-y-auto">
            <Header />
            <div className="flex-1 grid grid-cols-5">
                <div className="col-span-1">
                    <Sidebar />
                </div>
                <div className="col-span-3">
                    <Service setSelectedPlan={handleSetSelectedPlan} setSelectedPrice={handleSetSelectedPrice} sendJsonData={sendJsonData} />
                </div>
                <div className="col-span-1">
                    <MoneySidebar plan={selectedPlan} price={selectedPrice} jsonData={jsonData}/>
                </div>
            </div>
        </div>

  );
}
