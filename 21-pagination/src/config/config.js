import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT || 3000,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    JWT_SECRET: process.env.JWT_SECRET,
};

export default config;