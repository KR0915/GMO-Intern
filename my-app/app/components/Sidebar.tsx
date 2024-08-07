import React, { useState } from 'react';
import Link from 'next/link';

interface MenuItem {
  icon: string;
  label: string;
  subItems?: string[];
}

// メニューアイテムのオプションを作成
const menuItems: MenuItem[] = [
  { icon: '➕', label: 'サーバー追加' },
  { icon: '💻', label: 'サーバー' },
  { icon: '🔧', label: 'ストレージ' },
  { icon: '💽', label: 'イメージ' },
  { icon: '🛜', label: 'ネットワーク', subItems: ['追加IPアドレス', 'プライベートネットワーク', 'ロードバランサー'] },
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

// サイドバーコンポーネントを定義（サーバー追加だけ色を変える）
const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleSubMenu = (label: string) => {
    setExpanded(expanded === label ? null : label);
  };

  return (
    <div className="w-64 min-h-screen bg-white text-blue-400 flex flex-col">
      <ul className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <>
            <Link href="/error/404" key={index} legacyBehavior>
              <a>
                <li
                  className={`flex items-center p-3 rounded transition-colors cursor-pointer 
                    ${item.label === 'サーバー追加' ? 'bg-blue-400 text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => item.subItems && toggleSubMenu(item.label)}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  <span className="text-lg">{item.label}</span>
                </li>
              </a>
            </Link>
            {item.label === expanded && item.subItems && (
              <ul className="pl-10">
                {item.subItems.map((sub, subIndex) => (
                  <li key={subIndex} className="text-sm text-gray-700 py-1">
                    {sub}
                  </li>
                ))}
              </ul>
            )}
          </>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
