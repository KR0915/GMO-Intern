import React from 'react';

export default function MoneySidebar() {
    return (
        <div className="ml-[1rem] border-l border-gray-400 pl-2 h-80 mt-10">
            <div className="mt-4">
                <p>サービス: VPS</p>
                <p>CPU: 3Core</p>
                <p>メモリ: 2GB</p>
                <p>SSD: 100GB</p>
                <p className="border-b border-gray-300 pb-2 px-4">料金内訳</p>
                <p>サーバー料金: 5,350 円（6ヶ月分）</p>
                <p>料金タイプ: まとめトク</p>
                <p>契約期間: 2025/02/07</p>
                <hr className="border-gray-300 my-2" />
                <h2 className="mt-4">合計</h2>
                <p>5,350 円 (消費税 486.39 円)</p>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">続ける</button>
            </div>
        </div>
    );
}