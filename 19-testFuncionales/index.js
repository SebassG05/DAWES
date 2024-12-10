import app from './src/app.js';
import logger from './src/utils/logger.js';
import config from './src/config/config.js';

const PORT = config.PORT;

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});