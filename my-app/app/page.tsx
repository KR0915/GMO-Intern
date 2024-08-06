import React from 'react';
import Service from './components/Service';  // Serviceコンポーネントをインポート
import Header from './components/Header'; // Headerコンポーネントをインポーネート
import Sidebar from './components/Sidebar'; // Sidebarコンポーネントをインポート

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <Service /> 
      </div>
    </div>
  );
};

export default HomePage;