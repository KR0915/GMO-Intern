declare module 'ssh2' {
    import { EventEmitter } from 'events';
    import { ReadStream, WriteStream } from 'fs';
  
    interface ConnectConfig {
      host: string;
      port?: number;
      username: string;
      password?: string;
      privateKey?: Buffer | string;
      passphrase?: string;
      agent?: string;
      agentForward?: boolean;
      readyTimeout?: number;
      sock?: any;
      keepaliveInterval?: number;
      keepaliveCountMax?: number;
      authHandler?: Function;
      debug?: Function;
    }
  
    class Client extends EventEmitter {
      connect(config: ConnectConfig): this;
      end(): void;
      destroy(): void;
      exec(command: string, callback: (err: Error | undefined, channel: ClientChannel) => void): void;
      sftp(callback: (err: Error | undefined, sftp: SFTPWrapper) => void): void;
      on(event: 'ready', listener: () => void): this;
      on(event: 'error', listener: (err: Error) => void): this;
    }
  
    interface SFTPWrapper {
      createReadStream(path: string, options?: any): ReadStream;
      createWriteStream(path: string, options?: any): WriteStream;
    }
  
    interface ClientChannel extends EventEmitter {
      close(): void;
      end(): this;
      setEncoding(encoding: string): this;
      pause(): this;
      resume(): this;
      pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean }): T;
      unpipe<T extends NodeJS.WritableStream>(destination: T): this;
    }
  }
  