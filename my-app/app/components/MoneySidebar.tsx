import React, { useState, useEffect } from 'react';
import RunScript from './RunScript';

interface MoneySidebarProps {
  plan: string | null;
  price: number | null;
  jsonData: any; // jsonData プロパティを追加
}

export default function MoneySidebar({ plan, price, jsonData }: MoneySidebarProps) {


  // useEffect(() => {
  //   console.log("jsonData:", jsonData); // jsonDataをコンソールに出力
  // }, []); // 依存配列を空にする

  console.log("jsonData:", jsonData);

  const [IPAddress, setIPAddress] = useState<string | null>(null);
  
  async function create() {
    console.log("Received JsonData:", jsonData);
    console.log(jsonData.imageRef);
    const size = 100; // 容量
    const flavor = jsonData.flavorId; // フレーバー -> 追加
    const image = jsonData.imageRef; // イメージ -> 改修
    // const image = "Docker"; // イメージデバッグ
    const volumeName = jsonData.name; // ボリューム名
    const ServerName = jsonData.name; // サーバー名
    const security_groups = "IPv4v6-SSH"; //セキュリティグループ
    const volumeDescription = jsonData.description; // 説明
    const volume_type = jsonData.volume_type; // ボリュームタイプ
  




    console.log("create関数が呼ばれました"); // create関数が呼ばれたことをコンソールに出力
    const user = "USER";

    console.log(image);
    // イメージの取得
    const imageGet = await fetch(
      `/api/getimageid?user=${user}&target=${image}`
    );
    const imageJson = await imageGet.json();
    console.log(imageJson);
    const imageRef = imageJson as string;

    // ボリュームの確保
    const volGetID = await fetch(`/api/getvolumeid?user=${user}`, {
      method: "POST",
      body: JSON.stringify({
        size: size,
        description: volumeDescription,
        name: volumeName,
        imageRef: imageRef,
        volume_type,
      }),
    });

    const volIDJson = await volGetID.json();
    var volume_id = volIDJson.volume?.id as string;
    console.log("ボリュームID:", volume_id); // ボリュームIDをコンソールに出力

    // 完了するまで待機
    while (true) {
      const volGetDetail = await fetch(`/api/getvolumedetail?volume_id=${volume_id}`);
      const volDetail = await volGetDetail.json();
      const status = volDetail.volume.status;
      console.log("ボリュームステータス:", status); // ボリュームステータスをコンソールに出力
      if (status != "creating") {
        break
      }
    }

    console.log("ボリューム作成完了"); // ボリューム作成完了をコンソールに出力
    console.log(flavor);

    // フレーバーの取得
    const flavorGet = await fetch(
      `/api/getflavorid?user=${user}&flavor=${flavor}`
    );
    const flavorJson = await flavorGet.json();
    const flavorRef = flavorJson as string;

    console.log("フレーバーID:", flavorRef); // フレーバーIDをコンソールに


    // 作成
    const APIcreate = await fetch(`/api/create?user=${user}`, {
      method: "POST",
      body: JSON.stringify({
        flavorRef,
        volume_id,
        name_tag: ServerName,
        security_groups,
      }),
    });
    const serverID = await APIcreate.json(); // serverID
    console.log("サーバーID:", JSON.stringify(serverID)); // 作成結果をコンソールに出力

    const GetServerDetail = await fetch(`/api/getserverdetail?serverid=${serverID}`);
    console.log("hello");
    const IP = await GetServerDetail.json();
    setIPAddress(IP);

    console.log("IPアドレス:", IP); // 作成結果をコンソールに出力
    console.log("IPアドレス:", JSON.stringify(IP)); // 作成結果をコンソールに出力
  }


  return (
    <div className="ml-[1rem] border-l border-gray-400 pl-2 mt-10 bg-white sticky top-[130px] rounded-lg mx-4 p-4 bg-opacity-80">
      <div className="mt-4">
        <div className='flex justify-between'>
          <p className=''>選択されたプラン:</p>
          <p className=''>{plan ? plan : '未選択'}</p>
        </div>
        <div className='flex justify-between'>
          <p className=''>価格:</p>
          <p>{price ? `${price.toLocaleString()} 円 /月` : '未選択'}</p>
        </div>
        <div className='border-b-2 border-gray-300'></div>
        <div className="flex flex-col justify-center items-center mt-4 space-y-4">
        <button
          onClick={() => {
          console.log("追加ボタンがクリックされました"); // 追加ボタンがクリックされたことをコンソールに出力
          create();
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-17 rounded shadow-lg transition duration-300"
        >
        追加
        </button>
        <div className="flex items-center">
        <RunScript />
        </div>
        </div>
      
      </div>
    </div>
  );
}
