/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: false,
  images: {
    domains: ['picsum.photos', 'images.unsplash.com', 'fastly.picsum.photos'],
  },
};

module.exports = nextConfig; 