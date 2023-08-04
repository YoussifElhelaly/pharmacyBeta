/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
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
