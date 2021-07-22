enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type Options<TRequest> = {
  method: METHODS;
  timeout: number;
  headers: { [key: string]: string };
  data: TRequest;
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

class HTTPTransport {
  get = (url: string, options: Options): Promise<unknown> => this.request(url, { ...options, method: METHODS.GET });

  post = (url: string, options = {}): Promise<unknown> => this.request(url, { ...options, method: METHODS.POST });

  put = (url: string, options = {}): Promise<unknown> => this.request(url, { ...options, method: METHODS.PUT });

  delete = (url: string, options = {}): Promise<unknown> => this.request(url, { ...options, method: METHODS.DELETE });

  request = (url: string, options: Options<TRequest>) => {
    const {
      method,
      timeout = 5000,
      headers = { 'Content-Type': 'application/json' },
      data,
    } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, method === METHODS.GET && !!data ? `${url}${queryStringify(data)}` : url);
      xhr.timeout = timeout;
      Object.entries(headers).forEach(([key, value]) => {
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
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
