"use client";

import { useState } from "react";

export default function Page() {
  const [size, setSize] = useState(100);
  const [flavor, setFlavor] = useState("flavor1GB");
  const [flavorRef, setFlavorRef] = useState("");
  const [image, setImage] = useState("Docker");
  const [imageRef, setImageRef] = useState("");
  const [volumeName, setVolumeName] = useState("volume-name");
  const [ServerName, setServerName] = useState("server-name");
  const [security_groups, setSecurityGroups] = useState("IPv4v6-SSH");

  const handleSetSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(Number(event.target.value));
  };
  const handleSetFlavor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFlavor(event.target.value);
  };
  const handleSetImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
  };
  const handleSetVolumeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolumeName(event.target.value);
  };
  const handleSetServerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServerName(event.target.value);
  };
  const handleSetSecurityGroups = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecurityGroups(event.target.value);
  };

  const volumeDescription = null;
  const user = "USER";

  async function create() {
    // イメージの取得
    const imageGet = await fetch(
      `/api/getimageid?user=${user}&target=${image}`
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
    console.log(volume_id);

    // 完了するまで待機
    while (true) {
      const volGetDetail = await fetch(
        `/api/getvolumedetail?volume_id=${volume_id}`
      );
      const volDetail = await volGetDetail.json();
      const status = volDetail.volume.status;
      console.log(status);
      if (status != "creating") {
        break;
      }
    }

    // フレーバーの取得
    const flavorGet = await fetch(
      `/api/getflavorid?user=${user}&flavor=${flavor}`
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
        name_tag: ServerName,
        security_groups,
      }),
    });

    const createdJson = await APIcreate.json();
    console.log(JSON.stringify(createdJson));
  }

  return (
    <div className="text-left mt-8">
      <div>
        <p>
          Size:{" "}
          <input
            type="number"
            value={size}
            onChange={handleSetSize}
            placeholder="Volume size"
          />
        </p>
      </div>
      <div>
        <p>
          Image:{" "}
          <input
            type="text"
            value={size}
            onChange={handleSetImage}
            placeholder="Image"
          />
        </p>
        <p>imageID: {imageRef}</p>
      </div>
      <div>
        <p>
          Flavor:{" "}
          <input
            type="text"
            value={flavor}
            onChange={handleSetFlavor}
            placeholder="Memory size"
          />
        </p>
        <p>flavorID: {flavorRef}</p>
      </div>{" "}
      <div>
        <p>
          VolumeName:{" "}
          <input
            type="text"
            value={volumeName}
            onChange={handleSetVolumeName}
            placeholder="Volume name"
          />
        </p>
      </div>
      <div>
        <p>
          ServerName:{" "}
          <input
            type="text"
            value={ServerName}
            onChange={handleSetServerName}
            placeholder="Server name"
          />
        </p>
      </div>
      <div>
        <p>
          SecurityGroup:{" "}
          <input
            type="text"
            value={security_groups}
            onChange={handleSetSecurityGroups}
            placeholder="Security group"
          />
        </p>
      </div>
      <div>
        <button className="p-2" onClick={() => create()}>
          Create!
        </button>
      </div>
    </div>
  );
}
