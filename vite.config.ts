import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        // サーバ起動時、ブラウザ表示
        open: '/index.html',
    },
    build: {
        // 0: スプライトなどのアセットをロードした時にBase64URLへのインライン化を無効化
        assetsInlineLimit: 0,
    }
});