// ボリューム情報の取得

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const volume_id = searchParams.get("volume_id")
    const token = process.env.NEXT_PUBLIC_TOKEN as string;
    const project_name = process.env.NEXT_PUBLIC_PROJECTNAME as string;

    const endpoint =
      `https://block-storage.c3j1.conoha.io/v3/${project_name}/volumes/${volume_id}`;
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Auth-Token": token,
      },
    });
    const detail = await response.json();
    console.log(detail);
    return Response.json(detail);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
