"use client";

import React from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export default function Auth() {
    const router = useRouter();

    // const clickHundler = () => {
    //     router.push("/account");
    // };

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    
    const handleLogin = async () => {
      try {
          setLoading(true);
          const { data, error } = await supabase.auth.signInWithPassword({
              email,
              password,
          });
          if (error) throw error;

          // ログイン成功時にユーザー情報をDBに保存（存在しない場合）
          if (data.user) {
              await saveUserToDB(data.user);
          }

          router.push("/dashboard");
      } catch (error) {
          alert((error as any).message);
      } finally {
          setLoading(false);
      }
  };

    const handleSignUp = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.auth.signUp({
              email,
              password,
          });
          if (error) throw error;

          if (data.user) {
              await saveUserToDB(data.user);
              alert("アカウント登録に成功しました!");
          }
        } catch (error) {
          alert((error as any).message);
        } finally {
          setLoading(false);
        }
    };

    const saveUserToDB = async (user: any) => {
      try {
          // まず、ユーザーがすでに存在するかどうかを確認
          const { data: existingUsers, error: selectError } = await supabase
              .from('users')
              .select('id')
              .eq('email', user.email);
  
          if (selectError) {
              // エラーが発生した場合
              throw selectError;
          }
  
          if (!existingUsers || existingUsers.length === 0) {
              // ユーザーが存在しない場合のみ挿入
              const { data, error } = await supabase.from("users").insert({
                  id: user.id,
                  email: user.email,
                  user_id: process.env.NEXT_PUBLIC_USERID,
                  password: process.env.NEXT_PUBLIC_PASSWORD,
                  project_name: process.env.NEXT_PUBLIC_PROJECTNAME,
                  created_at: new Date(), // 新しい日付を使用
              });
  
              if (error) {
                  throw error;
              }
          }
      } catch (error) {
        alert((error as Error).message);
      }
  };
  

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-center font-bold">ログイン</h1>
                        <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                        />
                        <button onClick={handleLogin} disabled={loading} className="w-full px-4 py-2 bg-[#12B8D7] rounded-lg">Login</button>
                        <button onClick={handleSignUp} disabled={loading}className="w-full px-4 py-2 bg-[#12B8D7] rounded-lg">Sign Up</button>
                </div>
            </div>
        </div>
    );
}
