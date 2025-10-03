/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig;
