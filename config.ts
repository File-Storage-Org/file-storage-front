const config = {
  AUTH_BACKEND_URL: process.env.NEXT_PUBLIC_AUTH_BACKEND_URL,
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  MINIO_ACCESS_KEY: process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY: process.env.NEXT_PUBLIC_MINIO_SECRET_KEY,
  MINIO_BUCKET: process.env.NEXT_PUBLIC_MINIO_BUCKET,
  MINIO_HOSTNAME: process.env.NEXT_PUBLIC_MINIO_HOSTNAME,
};

export default config;
