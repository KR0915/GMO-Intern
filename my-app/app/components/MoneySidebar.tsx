import React from 'react';

interface MoneySidebarProps {
  plan: string | null;
  price: number | null;
}

export default function MoneySidebar({ plan, price }: MoneySidebarProps) {
    return (
        <div className="ml-[1rem] border-l border-gray-400 pl-2 h-80 mt-10">
            <div className="mt-4">
                <p>選択されたプラン: {plan || '未選択'}</p>
                <p>価格: {price ? `${price.toLocaleString()} 円 /月` : '未選択'}</p>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">追加</button>
            </div>
        </div>
    );
}