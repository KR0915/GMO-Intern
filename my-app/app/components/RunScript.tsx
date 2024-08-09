import { useState } from "react";

interface ServiceProps {
  IP: string;
}

export default function RunScript({ IP }: ServiceProps) {
  const [output, setOutput] = useState("");
  //const IP = "Hoge";

  const RunScript = async () => {
    console.log("IP:", IP);
    try {
      console.log("Running script...");
      const res = await fetch(`/api/runscript?host=${IP}`, { method: "GET" });
      const data = await res.json();

      if (res.ok) {
        console.log("API call successful:", data.output);
        setOutput(data.output);
      } else {
        console.error("API call error:", data.error);
        setOutput(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Fetch error:", (error as Error).message);
      setOutput(`Fetch error: ${(error as Error).message}`);
    }

    return (
      <div className="w-full h-auto">
        <button
          onClick={RunScript}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xs py-2 px-2 rounded shadow-lg transition duration-300"
        >
          シェルスクリプトを実行する
        </button>
        {/* <pre>{output}</pre> */}
      </div>
    );
  };
}
