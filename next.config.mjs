import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});


const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true, // make sure this is enabled for App Router
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "vadailiveawsbucket.s3.ap-south-1.amazonaws.com",
                pathname: "/**", // allow all paths (or narrow it down if needed)
            },
        ],
    },
};

export default bundleAnalyzer(nextConfig);
