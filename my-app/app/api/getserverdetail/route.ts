// サーバー詳細情報の取得

import Auth from "../../components/Auth";
import { supabase } from "@/utils/supabase";

export type SampleJsonOjb = {
  id: string;
  name: string;
  links: [];
};

export async function GET(request: Request) {
  var token = "";
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");
    const serverID = searchParams.get("serverid");
    console.log(serverID);

    token = process.env.NEXT_PUBLIC_TOKEN as string;

    const endpoint = `https://compute.c3j1.conoha.io/v2.1/servers/${serverID}`;
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Auth-Token": token,
      },
    });

    const resJson = await response.json();
    const IPkey = Object.keys(resJson.server.addresses)[0];
    const IP = resJson.server.addresses[IPkey][1].addr;
    return Response.json(IP);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
