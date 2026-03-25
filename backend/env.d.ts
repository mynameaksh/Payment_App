declare namespace NodeJS {
    interface ProcessEnv {
        MONGO_URL: string;
        PORT: number;
        JWT_SECRET: string
        REFRESH_SECRET: string
    }
}
