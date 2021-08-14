/* eslint-disable implicit-arrow-linebreak */
enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type Options<TRequest> = {
  method?: METHODS;
  timeout?: number;
  headers?: { [key: string]: string };
  data?: TRequest;
};

function queryStringify<TRequest>(data: TRequest): string {
  if (!data) {
    throw new Error('Не переданы данные!');
  }
  let queryString = '?';
  Object.entries(data).forEach(([key, value]) => {
    queryString += `${key}=${value}&`;
  });
  return queryString.slice(0, -1);
}

class HTTPTransport<TRequest> {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get = (url: string, options: Options<TRequest>): Promise<unknown> =>
    this.request(url, { ...options, method: METHODS.GET });

  post = (url: string, options: Options<TRequest>): Promise<unknown> =>
    this.request(url, { ...options, method: METHODS.POST });

  put = (url: string, options: Options<TRequest>): Promise<unknown> =>
    this.request(url, { ...options, method: METHODS.PUT });

  delete = (url: string, options: Options<TRequest>): Promise<unknown> =>
    this.request(url, { ...options, method: METHODS.DELETE });

  request = (url: string, options: Options<TRequest>) => {
    const fullUrl: string = this.baseUrl + url;
    const {
      method,
      timeout = 5000,
      headers = { 'Content-Type': 'application/json' },
      data,
    } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open(
        method || METHODS.GET,
        method === METHODS.GET && !!data ? `${fullUrl}${queryStringify(data)}` : fullUrl,
      );
      xhr.timeout = timeout;

      Object.entries(headers).forEach(([key, value]) => {
        if (data?.form && key === 'Content-Type') {
          return;
        }
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data.form) {
        xhr.send(data.form);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
