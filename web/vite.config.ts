import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        hmr: {
            protocol : "wss",
            host : process.env.DOMAIN_NAME,
            port : process.env.WEB_PORT
        },
        watch:{
            usePolling: true
        }
    }
})
