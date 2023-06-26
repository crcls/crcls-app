export {}

interface CRCLS {
  ping: () => Promise<string>
}

declare global {
  interface Window { CRCLS: CRCLS }
}
