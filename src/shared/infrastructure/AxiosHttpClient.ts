import axios, {AxiosInstance} from 'axios';

import { IHttpClient } from './IHttpClient';

interface AxiosHttpClientOptions {
  baseurl: string;
  params?: Record<string, unknown>;
}

export class AxiosHttpClient implements IHttpClient {
  readonly #axiosInstance: AxiosInstance;

  constructor(dependencies: {options: AxiosHttpClientOptions}) {
    this.#axiosInstance = axios.create({
      baseURL: dependencies.options.baseurl,
      params: dependencies.options.params,
    });
  }
  async get<Response>(
    url: string,
    options?: Record<string, unknown>,
  ): Promise<Response> {
    try {
      const {data} = await this.#axiosInstance.get<Response>(url, options);

      return data;
    } catch (error) {
      console.log(error);
      throw new Error(`Ha ocurrido un error al obtener los datos en: ${url}`);
    }
  }
}
