// ボリュームタイプの取得
// https://doc.conoha.jp/api-vps3/volume-get_types_list-v3/
export async function GET(request: Request) {
    try {
      const {searchParams} = new URL(request.url);
      const user = searchParams.get("user");
      const token = process.env.NEXT_PUBLIC_TOKEN as string; //修正
      const projectname = process.env.NEXT_PUBLIC_PROJECTNAME; // 修正

      const endpoint = `https://block-storage.c3j1.conoha.io/v3/${projectname}/types`;
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
      return Response.json(data.volume_types);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  