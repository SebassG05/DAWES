import app from "./app.js";
import config from "./config.js";
import logger from "./utils/logger.js";

const PORT = config.app.PORT;

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});