import React from 'react';
import Service from './components/Service';  // Serviceコンポーネントをインポート
import Header from './components/Header'; // Headerコンポーネントをインポーネート
import Sidebar from './components/Sidebar'; // Sidebarコンポーネントをインポート

export default function Home() {
  return (
    <div className="flex">
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
