// ボリュームIDの取得
// https://doc.conoha.jp/api-vps3/volume-create_vol-v3/
export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const user = searchParams.get("user");
    const token = process.env.TOKEN as string; // トークンの取得
    const projectname = process.env.PROJECTNAME;

    const body = await request.json();

    const endpoint = `https://block-storage.c3j1.conoha.io/v3/${projectname}/volumes`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "X-Auth-Token": token,
      },
      body: JSON.stringify({
        volume: {
          size: body.size,
          description: body.description,
          name: body.name || "server-name",
          volume_type: body.volume_type,
          imageRef: body.imageRef,
        },
      }),
    });
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
