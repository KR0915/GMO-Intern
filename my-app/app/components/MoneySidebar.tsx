// MoneySidebar.tsx
"use client";

import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectedPlanState, selectedPriceState, selectedAppState, selectedServiceState } from '../recoil/atoms';

export default function MoneySidebar() {
  const selectedPlan = useRecoilValue(selectedPlanState);
  const selectedPrice = useRecoilValue(selectedPriceState);
  const selectedApp = useRecoilValue(selectedAppState);
  const selectedService = useRecoilValue(selectedServiceState);

  const volumeDescription = null;
  const user = "USER";

  async function create() {
    console.log("create関数が呼ばれました");
    console.log("選択されたサービス:", selectedService);
    console.log("選択されたプラン:", selectedPlan);
    console.log("選択された価格:", selectedPrice);
    console.log("選択されたアプリケーション:", selectedApp);

    // イメージの取得
    const imageGet = await fetch(
      `/api/getimageid?user=${user}&target=${selectedApp}`
    );
    const imageJson = await imageGet.json();
    const imageRef = imageJson as string;

    // ボリュームの確保
    const volGetID = await fetch(`/api/getvolumeid?user=${user}`, {
      method: "POST",
      body: JSON.stringify({
        size: selectedPlan ? parseInt(selectedPlan.size, 10) : 100, 
        description: volumeDescription,
        name: selectedService, // サービス名を使用
        imageRef: imageRef,
        volume_type: "c3j1-ds02-boot",
      }),
    });
    const volIDJson = await volGetID.json();
    var volume_id = volIDJson.volume?.id as string;
    console.log("ボリュームID:", volume_id);

    // 完了するまで待機
    while (true) {
      const volGetDetail = await fetch(
        `/api/getvolumedetail?volume_id=${volume_id}`
      );
      const volDetail = await volGetDetail.json();
      const status = volDetail.volume.status;
      console.log("ボリュームステータス:", status);
      if (status !== "creating") {
        break;
      }
    }

    // フレーバーの取得
    const flavorGet = await fetch(
      `/api/getflavorid?user=${user}&flavor=${selectedPlan?.size}`
    );
    const flavorJson = await flavorGet.json();
    const flavorRef = flavorJson as string;

    // 作成
    const APIcreate = await fetch(`/api/create?user=${user}`, {
      method: "POST",
      body: JSON.stringify({
        flavorRef,
        volume_id,
        name_tag: selectedService, // サービス名を使用
        security_groups: "default",
        selectedApp,
      }),
    });

    const createdJson = await APIcreate.json();
    console.log("作成結果:", JSON.stringify(createdJson));
  }


  return (
    <div className="ml-[1rem] border-l border-gray-400 pl-2 mt-10 bg-white sticky top-[130px] rounded-lg mx-4 p-4 bg-opacity-80">
      <div className="mt-4">
        <div className='flex justify-between'>
          <p className=''>サービス:</p>
          <p className=''>{selectedService || '未選択'}</p>
        </div>
        <div className='flex justify-between'>
          <p className=''>メモリ:</p>
          <p className=''>{selectedPlan ? selectedPlan.size : '未選択'}</p>
        </div>
        <div className='flex justify-between'>
          <p className=''>CPU:</p>
          <p className=''>{selectedPlan ? selectedPlan.cpu : '未選択'}</p>
        </div>
        <div className='flex justify-between'>
          <p className=''>SSD:</p>
          <p className=''>{selectedPlan ? selectedPlan.ssd : '未選択'}</p>
        </div>
        <div className='flex justify-between'>
          <p className=''>価格:</p>
          <p>{selectedPrice ? `${selectedPrice.toLocaleString()} 円 /月` : '未選択'}</p>
        </div>
        <div className='border-b-2 border-gray-300'></div>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => {
              console.log("追加ボタンがクリックされました"); // 追加ボタンがクリックされたことをコンソールに出力
              create();
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            追加
          </button>
        </div>
      </div>
    </div>
  );
}
