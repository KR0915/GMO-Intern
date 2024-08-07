/* ARCHIVED
// トークンの取得
const getToken = async (userid, password, projectname) => {
  try {
    const endpoint = "https://identity.c3j1.conoha.io/v3/auth/tokens"; // APIのエンドポイント
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth: {
          identity: {
            methods: ["password"],
            password: {
              user: {
                id: userid,
                password: password,
              },
            },
          },
          scope: {
            project: {
              id: projectname,
            },
          },
        },
      }),
    });
    const headers = await response.headers;
    const token = headers.get("x-subject-token");
    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ボリュームタイプの取得
// https://doc.conoha.jp/api-vps3/volume-get_types_list-v3/
const getVolumeType = async (token, projectname) => {
  try {
    const endpoint = `https://block-storage.c3j1.conoha.io/v3/${projectname}/types`;
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Auth-Token": token,
      },
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let jsonString = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      jsonString += decoder.decode(value, { stream: true });
    }
    const data = JSON.parse(jsonString);
    return data.volume_types;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// イメージIDの取得
// https://doc.conoha.jp/api-vps3/image-get_images_list-v3/
const getImageID = async (token) => {
  try {
    const endpoint =
      "https://image-service.c3j1.conoha.io/v2/images?name=vmi-centos-stream9-amd64";
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Auth-Token": token,
      },
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let jsonString = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      jsonString += decoder.decode(value, { stream: true });
    }
    const data = JSON.parse(jsonString);
    return data.images;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ボリュームIDの取得
// https://doc.conoha.jp/api-vps3/volume-create_vol-v3/
const getVolumeID = async (token, projectname, info) => {
  try {
    const endpoint = `https://block-storage.c3j1.conoha.io/v3/${projectname}/volumes`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "X-Auth-Token": token,
      },
      body: JSON.stringify({ // 配列をそのままjsonにして渡したい
        volume: {
          size: info.size,
          description: null,
          name: info.name,
          "volume-type": info.volumeType,
          imageRef: info.imageID,
        },
      }),
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let jsonString = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      jsonString += decoder.decode(value, { stream: true });
    }
    const data = JSON.parse(jsonString);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// フレーバーIDの取得
// https://doc.conoha.jp/api-vps3/compute-get_flavors_list-v3/
const getFlavorID = async (token) => {
  console.log("FLAVOR");
  try {
    const endpoint = "https://compute.c3j1.conoha.io/v2.1/flavors";
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Auth-Token": token,
      },
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let jsonString = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      jsonString += decoder.decode(value, { stream: true });
    }
    const data = JSON.parse(jsonString);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// VPSの作成
//  https://doc.conoha.jp/api-vps3/compute-create_vm-v3/
const createVPS = async (token, info) => {
  console.log("FLAVOR");
  try {
    const endpoint = "https://compute.c3j1.conoha.io/v2.1/servers";
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Auth-Token": token,
      },
      body: JSON.stringify({
        server: {
          flavorRef: info.flavorID,
          adminPass: info.adminPass,
          "block_device_mapping_v2":  [{"uuid": info.volumeID}],
          "metadata": {"instance_name_tag": "test-vps"},
          "security_groups": [{"name": "IPv4v6-SSH"}]
        },
      }),
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let jsonString = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      jsonString += decoder.decode(value, { stream: true });
    }
    const data = JSON.parse(jsonString);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

require("dotenv").config({ path: ".env.local" });
const userid = process.env.NEXT_PUBLIC_USERID;
const password = process.env.NEXT_PUBLIC_PASSWORD;
const projectname = process.env.NEXT_PUBLIC_PROJECTNAME;

let serverinfo = {};
serverinfo.size = 100;
serverinfo.name = "nametag";
serverinfo.volumeType = "c3j1-ds02-boot"
serverinfo.imageID = "d2ddeb80-bcbb-417e-bb96-3e87933437e1";

getToken(userid, password, projectname).then((token) => {
  console.log(token);
  getVolumeType(token, projectname).then((data) => {
    console.log(data);
  });
  getImageID(token).then((data) => {
    console.log(data);
    getVolumeID(token, projectname, serverinfo).then((data) => {
      console.log(data);
    });
  });
  getFlavorID(token).then((data) => {
    console.log(data);
  });
});
*/