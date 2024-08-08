// VPSの作成
//  https://doc.conoha.jp/api-vps3/compute-create_vm-v3/
export async function POST(request : Request) {
  try {
    const {searchParams} = new URL(request.url);
    const user = searchParams.get("user");
    const password = process.env.NEXT_PUBLIC_PASSWORD as string;
    const token = process.env.NEXT_PUBLIC_TOKEN as string;
    const body = await request.json();

    const endpoint = "https://compute.c3j1.conoha.io/v2.1/servers";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "X-Auth-Token": token,
      },
      body: JSON.stringify({
        server: {
          flavorRef: body.flavorRef,
          adminPass: password,
          "block_device_mapping_v2":  [{"uuid": body.volume_id}],
          "metadata": {"instance_name_tag": body.name_tag},
          "security_groups": [{"name": body.security_groups}]
        },
      }),
    });
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};