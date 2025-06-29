import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";



export default defineConfig({
  plugins: [
    reactRouter( ),
    tsconfigPaths(),
  ],
  define: {
    'import.meta.env.VITE_BUILD_DATE': JSON.stringify(
        new Date().toISOString()
    ),
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(
        process.env.npm_package_version
    ),
  },
});
