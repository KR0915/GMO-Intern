"use client";

import { useState } from "react";

export default function Page() {
  const user = "USER";
  const [token, setToken] = useState("");

  const size = 100; // 容量
  const flavorRef = "6f3c4747-8471-4a38-902b-4c57ad76d776"; // FlavorID
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
    while(true){
      const volGetDetail = await fetch(`/api/getvolumedetail?volume_id=${volume_id}`);
      const volDetail = await volGetDetail.json();
      const status = volDetail.volume.status;
      console.log(status);
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
    console.log(JSON.stringify(createdJson));
  }

  return (
    <div className="text-center mt-8">
      <div>
        <button className="p-2" onClick={create}>
          Create!
        </button>
        <p>{token}</p>
      </div>
    </div>
  );
}
