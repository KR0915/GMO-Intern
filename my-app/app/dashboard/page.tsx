"use client";

import React from 'react';
import Service from '../components/Service';  // Serviceコンポーネントをインポーロ
import Header from '../components/Header'; // Headerコンポーネントをインポート
import Sidebar from '../components/Sidebar'; // Sidebarコンポーネントをインポート
import MoneySidebar from '../components/MoneySidebar';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-custom-bg bg-cover bg-custom-right-bottom bg-fixed overflow-y-auto">
            <Header />
            <div className="grid grid-cols-5 flex-1 mt-16"> {/* ヘッダーの高さ分だけマージンを追加 */}
                <div className="h-full">
                    <Sidebar /> {/* ヘッダーの高さ分だけマージンを追加 */}
                </div>
                <div className="col-span-3">
                    <Service />
                </div>
                <div className="h-full"> {/* 高さを100%に設定 */}
                    <MoneySidebar /> {/* ヘッダーの高さ分だけマージンを追加 */}
                </div>
            </div>
        </div>
    );
}