export const getBaseUrl = () => {
  return process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173';
};

export const getUrl = (path: string) => {
  const baseUrl = getBaseUrl();
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
};
