import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silence "inferred workspace root" warnings by pinning the tracing root
  // to this app's directory (helps when multiple lockfiles exist up the tree).
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
