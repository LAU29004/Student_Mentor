declare module '*.css';
interface ImportMeta {
  readonly env: {
    readonly VITE_GOOGLE_CLIENT_ID: string;
    readonly [key: string]: string | undefined;
  };
}