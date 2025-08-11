import {
  type HttpRequestConfig,
  type HttpResponse,
  type RequestInterceptor,
  type ResponseInterceptor,
  ServerError,
} from "./types";

interface Interceptors {
  request: RequestInterceptor[];
  // biome-ignore lint/suspicious/noExplicitAny: <This is intentionally an array of mixed-type interceptors>
  response: ResponseInterceptor<any>[];
}

export class HttpClient {
  private _baseURL: string;
  private _interceptors: Interceptors = {
    request: [],
    response: [],
  };

  constructor(baseURL = "") {
    this._baseURL = baseURL;
  }

  public get interceptors() {
    return {
      request: {
        use: (
          onFulfilled: (
            config: HttpRequestConfig
          ) => HttpRequestConfig | Promise<HttpRequestConfig>,
          onRejected?: (error: unknown) => Promise<never>
        ) => {
          this._interceptors.request.push({ onFulfilled, onRejected });
        },
      },
      response: {
        use: <SuccessType = unknown>(
          onFulfilled: (
            response: HttpResponse<SuccessType>
          ) => HttpResponse<SuccessType> | Promise<HttpResponse<SuccessType>>,
          onRejected?: (error: ServerError) => Promise<never>
        ) => {
          this._interceptors.response.push({ onFulfilled, onRejected });
        },
      },
    };
  }

  private async request<T>(config: HttpRequestConfig): Promise<T> {
    let currentConfig = config;

    for (const interceptor of this._interceptors.request) {
      try {
        currentConfig = await interceptor.onFulfilled(currentConfig);
      } catch (error) {
        if (interceptor.onRejected) {
          return interceptor.onRejected(error);
        }
        return Promise.reject(error);
      }
    }

    try {
      const finalConfig = {
        credentials: "include" as const,
        ...currentConfig,
      };

      const response = await fetch(
        this._baseURL + finalConfig.url,
        finalConfig
      );

      if (!response.ok) {
        throw new ServerError({
          status: response.status,
          headers: response.headers,
          url: config.url,
          method: finalConfig.method ?? "GET", 
        });
      }

      if (
        response.headers.get("Content-Length") === "0" ||
        response.status === 204
      ) {
        return undefined as T;
      }

      const data: T = await response.json();

      let processedResponse: HttpResponse<T> = {
        data,
        status: response.status,
        headers: response.headers,
      };

      // 응답 인터셉터 실행 (성공)
      for (const interceptor of this._interceptors.response) {
        if (interceptor.onFulfilled) {
          processedResponse = await interceptor.onFulfilled(processedResponse);
        }
      }

      return processedResponse.data;
    } catch (error) {
      if (error instanceof ServerError) {
        const errorInterceptorChain = this._interceptors.response.reduce(
          (promise, interceptor) => {
            // onRejected 핸들러가 있는 경우에만 체인에 추가합니다.
            if (interceptor.onRejected) {
              // 이전 Promise가 거부되었을 때 현재 인터셉터의 onRejected를 실행하도록 연결합니다.
              return promise.catch(interceptor.onRejected);
            }
            return promise;
          },
          Promise.reject(error) // 체인의 시작은 최초 발생한 에러를 거부하는 Promise입니다.
        );

        return errorInterceptorChain;
      }
      return Promise.reject(error);
    }
  }

  private async _requestWithBody<T>(
    method: "POST" | "PUT" | "PATCH", // PATCH 등 다른 메서드도 확장 가능
    url: string,
    data?: unknown,
    config?: Omit<HttpRequestConfig, "url" | "method" | "body">
  ): Promise<T> {
    const headers = {
      "Content-Type": "application/json",
      ...config?.headers,
    };
    return this.request<T>({
      ...config,
      method, // 인자로 받은 메서드 사용
      url,
      body: JSON.stringify(data),
      headers,
    });
  }

  public async get<T>(
    url: string,
    config?: Omit<HttpRequestConfig, "url" | "method">
  ): Promise<T> {
    return this.request<T>({ ...config, method: "GET", url });
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: Omit<HttpRequestConfig, "url" | "method" | "body">
  ): Promise<T> {
    return this._requestWithBody("POST", url, data, config);
  }

  public async put<T>(
    url: string,
    data?: unknown,
    config?: Omit<HttpRequestConfig, "url" | "method" | "body">
  ): Promise<T> {
    return this._requestWithBody("PUT", url, data, config);
  }

  public async delete<T>(
    url: string,
    config?: Omit<HttpRequestConfig, "url" | "method">
  ): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE", url });
  }
}
