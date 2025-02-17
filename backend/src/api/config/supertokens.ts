import SuperTokens from "supertokens-node";
import EmailPassword from "supertokens-node/recipe/emailpassword";

// Validate environment variables first
const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const SUPERTOKENS_CONNECTION_URI = getEnvVar("SUPERTOKENS_CONNECTION_URI");
const API_DOMAIN = getEnvVar("NEXT_PUBLIC_API_DOMAIN");
const WEBSITE_DOMAIN = getEnvVar("NEXT_PUBLIC_WEBSITE_DOMAIN");

SuperTokens.init({
  supertokens: {
    connectionURI: SUPERTOKENS_CONNECTION_URI,
  },
  appInfo: {
    appName: "My App",
    apiDomain: API_DOMAIN,
    websiteDomain: WEBSITE_DOMAIN,
    apiBasePath: "/api/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init(),
  ],
});