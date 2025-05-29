/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com', 'img.clerk.com', 'res.cloudinary.com']
    },
    webpack: (config, { isServer }) => {
        // Fix for EINVAL error on Windows
        config.resolve.symlinks = false;
        return config;
    }
};

export default nextConfig;