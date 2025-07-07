export const isLogin = (): boolean => {
  const accessToken =  localStorage.getItem('access')
  if (!accessToken) return false
  return isValidToken(accessToken)
}

const isValidToken = (token: string): boolean => {
  try {
    // Check token exists
    if (!token || token.split('.').length !== 3) return false

    // Decode payload
    const payloadBade64 = token.split('.')[1]
    const payloadJson =  atob(payloadBade64)
    const payload = JSON.parse(payloadJson)

    // Check expiration
    const currentTimestamp = Math.floor(Date.now() / 1000)
    return payload.exp > currentTimestamp
  } catch (e) {
    console.error('Token validation error:', e)
    return false
  }
};

export const logout = (redirectToLogin: boolean = true): void => {
  // Clear all auth storages
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');

  if (redirectToLogin) {
    window.location.href = '/login';
  }
};

