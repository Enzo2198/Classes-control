export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

export const setCookie = (name: string, value: string, maxAgeInSeconds?: number) => {
  let cookieString: string = `${name}=${value}; path=/; secure; SameSite=strict`;
  if(maxAgeInSeconds){
    cookieString += `; max-age=${maxAgeInSeconds}`;
  }
  document.cookie = cookieString;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; SameSite=strict`;
};