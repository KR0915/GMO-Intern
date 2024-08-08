"use client";

import { useState } from "react";
import MoneySidebar from './MoneySidebar'; // MoneySidebarのインポートを追加

export default function Page() {
  const [token, setToken] = useState("");

  const size = 100; // 容量
  const flavorRef = "f2a77529-1815-43a2-bc14-1f3f6b09079c"; // FlavorID
  const imageRef = "30139c65-2650-47df-8c8f-23feb5287a48";
  const name_tag = "test-vps"; // 名前
  const security_groups = "IPv4v6-SSH"; //セキュリティグループ
  const volumeDescription = null;
  const volumeName = "my-name";

  async function getToken() { 
    const res = await fetch("/api/gettoken?user=d4b10aeb-7f1e-4e21-96c4-528a5afacd5b");
    const token = await res.json();
    setToken(token);
  }

  async function create() {
    console.log("create関数が呼ばれました"); // create関数が呼ばれたことをコンソールに出力

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
    console.log("ボリュームID:", volume_id); // ボリュームIDをコンソールに出力

    // 完了するまで待機
    while(true){
      const volGetDetail = await fetch(`/api/getvolumedetail?volume_id=${volume_id}`);
      const volDetail = await volGetDetail.json();
      const status = volDetail.volume.status;
      console.log("ボリュームステータス:", status); // ボリュームステータスをコンソールに出力
      if(status !="creating"){
        break
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
    console.log("作成結果:", JSON.stringify(createdJson)); // 作成結果をコンソールに出力
  }

  return (
    <div className="text-center mt-8">
      <div>
        <MoneySidebar plan={null} price={null}  />
        <p>{token}</p>
      </div>
    </div>
  );
}
