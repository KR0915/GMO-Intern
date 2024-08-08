// イメージIDの取得
// https://doc.conoha.jp/api-vps3/image-get_images_list-v3/

type JsonObj = {
  id: string;
  tags: string[];
  name: string;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");
    const target = searchParams.get("target");
    const token = process.env.NEXT_PUBLIC_TOKEN as string;

    const endpoint = "https://image-service.c3j1.conoha.io/v2/images?limit=200";
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
    if (target != null) {
      var targetID = "Hello";
      data.images.forEach((item: JsonObj) => {
        item.tags.forEach((tag: string) => {
          if (tag === `app_name=${target}` || tag === `dst_name=${target}`) {
            targetID = item.id;
          }
        });
      });
      return Response.json(targetID);
    } else {
      return Response.json(data.images);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
