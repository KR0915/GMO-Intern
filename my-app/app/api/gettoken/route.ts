import { supabase } from '@/utils/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");
    let userid;
    let password;
    let projectname;

    const { data, error } = await supabase
      .from('users')
      .select('user_id, password, project_name')
      .eq('id', user);

    if (error) {
      console.error('Error fetching data: ', error);
      return new Response(JSON.stringify({ error: "Data fetch error" }), { status: 500 });
    }
    
    if (data && data.length > 0) {
      userid = data[0].user_id;
      password = data[0].password;
      projectname = data[0].project_name;
    } else {
      console.error('User not found');
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
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

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching token:', errorData);
      return new Response(JSON.stringify({ error: "Token fetch error" }), { status: response.status });
    }

    const token = response.headers.get("x-subject-token");
    if (!token) {
      console.error('No token found in response headers');
      return new Response(JSON.stringify({ error: "Token not found in response" }), { status: 500 });
    }

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.log('Unexpected error:', error);
    return new Response(JSON.stringify({ error: "Unexpected error" }), { status: 500 });
  }
}
