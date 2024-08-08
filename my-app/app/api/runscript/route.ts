// import { exec } from "child_process";
// import { NextRequest, NextResponse } from 'next/server';
// import { promisify } from 'util';

// const execPromise = promisify(exec);

// export async function GET(req: NextRequest) {
//   try {
//     const { stdout, stderr } = await execPromise('sh scripts/flask.sh');
//     if (stderr) {
//       console.error('Script execution error:', stderr);
//       return NextResponse.json({ error: stderr }, { status: 500 });
//     }
//     console.log('Script execution output:', stdout);
//     return NextResponse.json({ output: stdout }, { status: 200 });
//   } catch (error: unknown) {
//     console.error('Script execution error:', error);
//     return NextResponse.json({ error: (error as Error).message }, { status: 500 });
//   }
// }

// import { exec } from "child_process";
// import { NextRequest, NextResponse } from 'next/server';
// import { promisify } from 'util';

// const execPromise = promisify(exec);

// export async function GET(req: NextRequest) {
//   try {
//     // scpコマンドでシェルスクリプトをリモートサーバーに転送
//     const scpCommand = 'scp scripts/flask.sh root@160.251.175.103:/root/';
//     const { stdout: scpOut, stderr: scpErr } = await execPromise(scpCommand);
//     if (scpErr) {
//       console.error('SCP error:', scpErr);
//       return NextResponse.json({ error: scpErr }, { status: 500 });
//     }
//     console.log('SCP output:', scpOut);

//     // SSHコマンドでリモートサーバー上でシェルスクリプトを実行
//     const sshCommand = 'ssh root@160.251.175.103 "bash /root/flask.sh"';
//     const { stdout: sshOut, stderr: sshErr } = await execPromise(sshCommand);
//     if (sshErr) {
//       console.error('SSH error:', sshErr);
//       return NextResponse.json({ error: sshErr }, { status: 500 });
//     }
//     console.log('SSH output:', sshOut);

//     return NextResponse.json({ output: sshOut }, { status: 200 });
//   } catch (error) {
//     console.error('Script execution error:', error);
//     return NextResponse.json({ error: (error as Error).message }, { status: 500 });
//   }
// }

// export const GETHandler = async (req: NextRequest) => {
//   return GET(req);
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'ssh2';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  const sshPassword = process.env.SSH_PASSWORD;
  const sshHost = '160.251.175.103';
  const sshUser = 'root';
  const localScriptPath = path.join(process.cwd(), 'scripts', 'flask.sh');
  const remoteScriptPath = '/root/flask.sh';

  if (!sshPassword) {
    return new NextResponse(JSON.stringify({ error: "SSH password is not set in the environment variables." }), { status: 500 });
  }

  const conn = new Client();

  return new Promise((resolve, reject) => {
    conn.on('ready', () => {
      console.log('Client :: ready');

      // SCPファイル転送
      conn.sftp((err, sftp) => {
        if (err) {
          conn.end();
          return reject(new NextResponse(JSON.stringify({ error: err.message }), { status: 500 }));
        }

        const readStream = fs.createReadStream(localScriptPath);
        const writeStream = sftp.createWriteStream(remoteScriptPath);

        writeStream.on('close', () => {
          console.log('File transferred successfully');

          // リモートサーバーでシェルスクリプトを実行
          conn.exec(`bash ${remoteScriptPath}`, (err, stream) => {
            if (err) {
              conn.end();
              return reject(new NextResponse(JSON.stringify({ error: err.message }), { status: 500 }));
            }

            let output = '';
            let stderrOutput = '';
            stream.on('close', (code, signal) => {
              console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
              conn.end();
              resolve(new NextResponse(JSON.stringify({ output: output + stderrOutput }), { status: 200 }));
            }).on('data', (data) => {
              console.log('STDOUT: ' + data);
              output += data;
            }).on('error', (err) => {
              console.error('STDERR: ' + err);
              stderrOutput += err;
            });
          });
        });

        readStream.pipe(writeStream);
      });
    }).connect({
      host: sshHost,
      port: 22,
      username: sshUser,
      password: sshPassword
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};