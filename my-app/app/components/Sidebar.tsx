import React from 'react';
import Link from 'next/link';

interface MenuItem {
  icon: string;
  label: string;
}

// メニューアイテムのオプションを作成
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

// サイドバーコンポーネントを定義（サーバー追加だけ色を変える）
export default function Sidebar() {
  return (
    <div className="col-span-1 bg-gray-100 p-4">
      <div className="flex flex-col space-y-2">
        {menuItems.map((item, index) => (
            <Link href="/error/404" key={index} legacyBehavior>
              <a>
                <li
                  className={`flex items-center p-3 rounded transition-colors cursor-pointer 
                    ${item.label === 'サーバー追加' ? 'bg-blue-400 text-white' : 'hover:bg-gray-100'}`}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  <span className="text-lg">{item.label}</span>
                </li>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};