// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     commonjsOptions: {
//       include: [/snarkjs/, /node_modules/]
//     }
//   },
//   optimizeDeps: {
//     include: ['snarkjs'],
//     exclude: ['fs'],
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    wasm(),
    topLevelAwait()
  ],
  build: {
    commonjsOptions: {
      include: [/snarkjs/, /node_modules/]
    },
    target: 'esnext',
  },
  optimizeDeps: {
    include: ['snarkjs'],
    exclude: ['fs'],
    esbuildOptions: {
      target: 'esnext'
    }
  }
})
