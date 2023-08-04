/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'inventory-apis.up.railway.app',

            },
        ],
    },
}

module.exports = nextConfig
