import app from "./server";
import { logger } from "./utils";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`App started on port ${PORT}`);
});
