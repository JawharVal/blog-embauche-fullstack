/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {
        resolveAlias: {},
        experimental: {
            sourceMaps: false,
        },
    },
};

module.exports = nextConfig;
