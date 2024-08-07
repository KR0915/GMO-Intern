// トークンの取得

import {supabase} from '@/utils/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");
    var userid;
    var password;
    var projectname;
    try{ // Supabase
      const {data, error} = await supabase
        .from('users')
        .select('user_id, password, project_name')
        .eq('id', user)
      if(error) {
        console.error('Error fetching data: ', error);
      }else{
        userid = data[0].user_id;
        password = data[0].password;
        projectname = data[0].project_name;
      }
    }catch(error){
      console.error('Unexpected error: ', error);
    }
    
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
