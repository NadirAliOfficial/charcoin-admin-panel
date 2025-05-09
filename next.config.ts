import path, { dirname } from "path";
import { fileURLToPath } from "url";
import pwa from "next-pwa";


const withPWA = require('next-pwa')({
  dest: 'public'
})


// No need to manually type NextConfig
const nextConfig = {
  images: {
    domains: ["picsum.photos", "fastly.picsum.photos"],
  },
};


export default withPWA(nextConfig);
