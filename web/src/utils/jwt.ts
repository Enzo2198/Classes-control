export const decodeToken = (token: string) => {
  try {
    // Check token exists
    if (!token || token.split('.').length !== 3) return false

    // Decode payload
    const payloadBade64 = token.split('.')[1]
    const payloadJson = atob(payloadBade64)
    return JSON.parse(payloadJson)
  } catch (e) {
    console.error('Decode token error:', e)
    return null
  }
}