// フレーバーIDの取得
// https://doc.conoha.jp/api-vps3/compute-get_flavors_list-v3/

import Auth from "../../components/Auth";
import { supabase } from "@/utils/supabase";

export type SampleJsonOjb = {
  id: string;
  name: string;
  links: [],
}

export async function GET(request: Request) {
  var token = "";
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");
    const flavor = searchParams.get("flavor");
    const flavors = {
      flavor1GB: "g2l-t-c2m1",
      flavor2GB: "g2l-t-c3m2",
      flavor4GB: "g2l-t-c4m4",
      flavor8GB: "g2l-t-c6m8",
      flavor16GB: "g2l-t-c8m16",
      flavor32GB: "g2l-t-c12m32",
      flavor64GB: "g2l-t-c24m64",
    };

    const targetFlavor = flavors[flavor as keyof typeof flavors] || null;
    console.log(targetFlavor);

    try {
      console.log("SUPABASE");
      const { data, error } = await supabase
        .from("users")
        .select("user_id, password, project_name")
        .eq("id", user);
      if (error) {
        console.error("Error fetching data: ", error);
      } else {
        console.log("Data from Supabase: ", data);
      }
    } catch (error) {
      console.error("Unexpected error: ", error);
    }

    token = process.env.NEXT_PUBLIC_TOKEN as string;

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

    if (flavor != null) {
      console.log(data.flavors);
      var targetID;
      data.flavors.map((item : SampleJsonOjb) => {
        if(item.name === targetFlavor){
          targetID = item.id;
        }
      })
      //var targetID = data.flavors.find((item) => {item.name === targetFlavor})?.id
      return Response.json(targetID);
    } else {
      return Response.json(data.flavors);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
