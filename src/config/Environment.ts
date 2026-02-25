import "dotenv/config"
import { get } from "env-var"

export const Environment = {
    PORT: get("PORT").required().asPortNumber(),

    MONGO_URI: get("MONGO_URI").required().asString(),
    DB_PASSWORD: get("DB_PASSWORD").required().asString()
}