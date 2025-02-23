import dotenv from 'dotenv';

dotenv.config();

const config = {
    app: {
        PORT: process.env.PORT || 3000,
    },
};

export default config;