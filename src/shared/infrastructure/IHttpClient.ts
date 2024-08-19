export interface IHttpClient {
  get<Response>(url: string, options?:  Record<string, unknown>): Promise<Response>;
}
