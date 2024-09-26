import * as Sentry from "@sentry/node";
import { errorHandler } from "../middlewares/error.handler.js";
import appStatusRoutes from "../routes/app.status.route.js"
export const initializeRoutes = (app) => {
  app.use(appStatusRoutes)
  app.use(Sentry.Handlers.errorHandler());
  app.use(errorHandler);
};
