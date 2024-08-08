"use client";

import { useState } from "react";
import MoneySidebar from './MoneySidebar';
import Service from './Service'; 

export default function Page() {
  const [token, setToken] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const size = 100; // 容量
  const flavorRef = "f2a77529-1815-43a2-bc14-1f3f6b09079c"; // FlavorID
  const imageRef = "30139c65-2650-47df-8c8f-23feb5287a48";
  const name_tag = "test-vps"; // 名前
  const security_groups = "IPv4v6-SSH"; //セキュリティグループ
  const volumeDescription = null;
  const volumeName = "my-name";

  async function test()
  {
    console.log("TEST");
  }


  async function create() {
    console.log("Create function executed"); // 追加ボタンが押されたことを確認するためのログ

    const user = "USER";

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
    console.log(volume_id);

    // 完了するまで待機
    while (true) {
      const volGetDetail = await fetch(`/api/getvolumedetail?volume_id=${volume_id}`);
      const volDetail = await volGetDetail.json();
      const status = volDetail.volume.status;
      console.log(status);
      if (status != "creating") {
        break;
      }
    }

    // 作成
    const APIcreate = await fetch(`/api/create?user=${user}`, {
      method: "POST",
      body: JSON.stringify({
        flavorRef,
        volume_id,
        name_tag,
        security_groups,
      }),
    });

    const createdJson = await APIcreate.json();
    console.log(JSON.stringify(createdJson));
  }

  return (
    <div className="text-center mt-8">
      <Service setSelectedPlan={setSelectedPlan} setSelectedPrice={setSelectedPrice} />
      <MoneySidebar plan={selectedPlan} price={selectedPrice} onCreate={create} />
    </div>
  );
}
