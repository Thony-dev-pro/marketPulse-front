export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export function getAllCookies(): Record<string, string> {
  const cookies: Record<string, string> = {};
  document.cookie.split(';').forEach(pair => {
    const [key, value] = pair.trim().split('=');
    if (key) cookies[key] = decodeURIComponent(value);
  });
  return cookies;
}
