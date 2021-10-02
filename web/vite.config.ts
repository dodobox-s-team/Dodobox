import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        hmr: {
            protocol : "wss",
            host : "localhost",
            port : 443
        },
        watch:{
            usePolling: true
        }
    }
})
