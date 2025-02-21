declare module 'bcryptjs' {
  export function hash(s: string, salt: string | number): Promise<string>
  export function compare(s: string, hash: string): Promise<boolean>
  export function genSalt(rounds?: number): Promise<string>
}

declare module 'jsonwebtoken' {
  export function sign(payload: any, secret: string, options?: any): string
  export function verify(token: string, secret: string): any
} 