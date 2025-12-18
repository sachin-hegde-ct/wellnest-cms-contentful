const PROD_ENV_NAMES = ["master", "production", "prod"];

const DESTRUCTIVE_ACTIONS = ["delete", "cleanup", "purge", "migrate"];

export function isProdEnvironment(env: string) {
  return PROD_ENV_NAMES.includes(env.toLowerCase());
}

export function isDestructiveAction(action: string) {
  return DESTRUCTIVE_ACTIONS.includes(action);
}
