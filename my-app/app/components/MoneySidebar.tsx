import React from 'react';

interface MoneySidebarProps {
  plan: string | null;
  price: number | null;
}

export default function MoneySidebar({ plan, price }: MoneySidebarProps) {
    return (
        <div className="ml-[1rem] border-l border-gray-400 pl-2 mt-10 bg-white sticky top-[130px] rounded-lg mx-4 p-4"> {/* ヘッダーの高さに合わせて調整 */}
            <div className="mt-4">
                <p>選択されたプラン: {plan || '未選択'}</p>
                <p>価格: {price ? `${price.toLocaleString()} 円 /月` : '未選択'}</p>
                <div className="flex justify-center items-center mt-4">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded">追加</button>
                </div>
            </div>
        </div>
    );
}