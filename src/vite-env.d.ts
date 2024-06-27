/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly PICKFU_API_URL: string
    readonly PICKFU_WEBSOCKET_URL: string

}

interface ImportMeta {
    readonly env: ImportMetaEnv
}