// フレーバーIDの取得
// https://doc.conoha.jp/api-vps3/compute-get_flavors_list-v3/
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");

    const token = process.env.TOKEN as string;

    const endpoint = "https://compute.c3j1.conoha.io/v2.1/flavors";
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Auth-Token": token,
      },
    });
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let jsonString = "";
    while (reader != null) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      jsonString += decoder.decode(value, { stream: true });
    }
    const data = JSON.parse(jsonString);
    return Response.json(data.flavors);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
