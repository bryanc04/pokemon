import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import restart from 'vite-plugin-restart';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
    base: '/', // Replace this with the actual base path your app will be served from
    root: 'src/', // Source files (typically where index.html is)
    publicDir: '../static/', // Path from "root" to static assets (files that are served as they are)
    server: {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env), // Open if it's not a CodeSandbox,
        
    },
    build: {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true // Add sourcemap
    },
    plugins: [
        react(),
        glsl(), // Support GLSL files
        restart({ restart: ['../static/**'] }) // Restart server on static file change
    ],
});
