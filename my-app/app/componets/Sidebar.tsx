import React from 'react';

// メニューアイテムの型を定義
interface MenuItem {
  icon: string;
  label: string;
}

// メニューアイテムのリストを作成
const menuItems: MenuItem[] = [
  { icon: '➕', label: 'サーバー追加' },
  { icon: '💻', label: 'サーバー' },
  { icon: '🔧', label: 'ストレージ' },
  { icon: '💽', label: 'イメージ' },
  { icon: '🛜', label: 'ネットワーク' },
  { icon: '🔑', label: 'セキュリティ' },
  { icon: '📁', label: 'オブジェクトストレージ' },
  { icon: '🌎', label: 'DNS' },
  { icon: '📄', label: 'ライセンス' },
  { icon: '📟', label: 'ドメイン' },
  { icon: '📊', label: 'API' },
  { icon: '🎗️', label: 'サポート' },
  { icon: '🗂️', label: 'フィードバック' },
  { icon: '🎚️', label: 'バージョン切り替え' },
];

// サイドバーコンポーネントを定義
const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      {/* 上部の空白を追加 */}
      <div className="mt-20"></div>
      {/* メニューリスト */}
      <ul className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <span className="mr-3 text-xl">{item.icon}</span>
            <span className="text-lg">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
