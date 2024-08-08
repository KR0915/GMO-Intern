"use client";

import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedPlanState, selectedPriceState, selectedAppState } from '../recoil/atoms';

export default function MoneySidebar() {
  const selectedPlan = useRecoilValue(selectedPlanState);
  const selectedPrice = useRecoilValue(selectedPriceState);
  const selectedApp = useRecoilValue(selectedAppState);

  const [size, setSize] = useState(100);
  const [flavorRef, setFlavorRef] = useState("");
  const [imageRef, setImageRef] = useState("");
  const [volumeName, setVolumeName] = useState("volume-name");
  const [serverName, setServerName] = useState("server-name");
  const [securityGroups, setSecurityGroups] = useState("IPv4v6-SSH");

  const volumeDescription = null;
  const user = "USER";

  async function create() {
    console.log("create関数が呼ばれました");
    console.log("選択されたプラン:", selectedPlan);
    console.log("選択された価格:", selectedPrice);
    console.log("選択されたアプリケーション:", selectedApp);

    // イメージの取得
    const imageGet = await fetch(
      `/api/getimageid?user=${user}&target=${selectedApp}`
    );
    const imageJson = await imageGet.json();
    setImageRef(imageJson as string);

    // ボリュームの確保
    const volGetID = await fetch(`/api/getvolumeid?user=${user}`, {
      method: "POST",
      body: JSON.stringify({
        size: size,
        description: volumeDescription,
        name: volumeName,
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
      `/api/getflavorid?user=${user}&flavor=${selectedPlan}`
    );
    const flavorJson = await flavorGet.json();
    const flavorRef = flavorJson as string;

    setFlavorRef(flavorRef);

    // 作成
    const APIcreate = await fetch(`/api/create?user=${user}`, {
      method: "POST",
      body: JSON.stringify({
        flavorRef,
        volume_id,
        name_tag: serverName,
        security_groups: securityGroups,
        selectedApp,
      }),
    });

    const createdJson = await APIcreate.json();
    console.log("作成結果:", JSON.stringify(createdJson));
  }

  return (
    <div className="ml-[1rem] border-l border-gray-400 pl-2 mt-10 bg-white sticky top-[130px] rounded-lg mx-4 p-4">
      <div className="mt-4">
        <p>選択されたプラン: {selectedPlan || '未選択'}</p>
        <p>価格: {selectedPrice ? `${selectedPrice.toLocaleString()} 円 /月` : '未選択'}</p>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => {
              console.log("追加ボタンがクリックされました");
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
