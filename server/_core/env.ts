export const ENV = {
  appId: process.env.VITE_APP_ID ?? "axa-shop-app",
  cookieSecret: process.env.JWT_SECRET ?? "default-secret-key-change-me-in-production",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
  ownerName: process.env.OWNER_NAME ?? "",
  adminPassword: process.env.ADMIN_PASSWORD ?? "admin123",
};
