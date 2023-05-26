export const toConnectableHostname = (hostname?: string) => {
  if (!hostname || hostname === '::1' || hostname === '0.0.0.0') {
    return 'localhost'
  }
  return hostname
}
