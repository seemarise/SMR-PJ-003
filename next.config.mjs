/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "vadailiveawsbucket.s3.ap-south-1.amazonaws.com", // add your S3 bucket domain here
        ],
    },
};

export default nextConfig;
