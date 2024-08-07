// トークンの取得
export async function GET(request: Request) {
  console.log("hello")
  try {
    const { searchParams } = new URL(request.url);
    /* DEBUG */
    const userid = process.env.USERID;
    const password = process.env.PASSWORD;
    const projectname = process.env.PROJECTNAME;

    const user = searchParams.get("user");
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
    return Response.json(token);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
