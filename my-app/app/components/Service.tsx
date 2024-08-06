import React from 'react';

// サービスのデータ型定義
interface ServiceItem {
  icon: JSX.Element;  // Reactのアイコン要素
  name: string;
  description: string;
}

// サービスアイテムのサンプルデータ
const services: ServiceItem[] = [
  { icon: <img src="/images/windows-icon.png" alt="Windows Server" />, name: 'Windows Server', description: 'VPS' },
  { icon: <img src="/images/gpu-icon.png" alt="GPUサーバー" />, name: 'GPUサーバー', description: '特化型サーバー' },
  { icon: <img src="/images/db-icon.png" alt="DBサーバー" />, name: 'DBサーバー', description: 'データベース最適化' },
  // その他のサービス項目を追加
];

// サービスコンポーネント
const Services: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {services.map(service => (
        <div key={service.name} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
          <div className="p-2">{service.icon}</div>
          <h3 className="text-lg font-semibold">{service.name}</h3>
          <p className="text-sm">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;
