import * as Sentry from "@sentry/node";
import { errorHandler } from "../middlewares/error.handler.js";
import productRoutes from "./product.js"
import appStatusRoutes from "../routes/app.status.route.js"
export const initializeRoutes = (app) => {
  app.use("/v1/api",productRoutes);
  app.use(appStatusRoutes)
  app.use(Sentry.Handlers.errorHandler());
  app.use(errorHandler);
};
