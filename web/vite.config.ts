import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        hmr: {
            protocol : "wss",
            host : process.env.DOMAIN_NAME,
            port : 8181
        },
        watch:{
            usePolling: true
        }
    }
})
