interface HTTPResponse<T> extends Response {
  parsedBody?: T;
}

export class RequestService {
  public async get<T>(
    path: string,
    args: RequestInit = { method: "GET" },
  ): Promise<HTTPResponse<T>> {
    return await this.http<T>(new Request(path, args));
  }

  public async post<T>(
    path: string,
    body: unknown,
    args: RequestInit = { method: "POST", body: JSON.stringify(body) },
  ): Promise<HTTPResponse<T>> {
    return await this.http<T>(new Request(path, args));
  }

  public async put<T>(
    path: string,
    body: unknown,
    args: RequestInit = { method: "PUT", body: JSON.stringify(body) },
  ): Promise<HTTPResponse<T>> {
    return await this.http<T>(new Request(path, args));
  }

  public async delete<T>(
    path: string,
    args: RequestInit = { method: "DELETE" },
  ): Promise<HTTPResponse<T>> {
    return await this.http<T>(new Request(path, args));
  }

  private async http<T>(request: RequestInfo): Promise<HTTPResponse<T>> {
    const response: HTTPResponse<T> = await fetch(request);

    try {
      response.parsedBody = await response.json();
    } catch (_error) {
      // ignore empty body
    }

    if (!response.ok) {
      throw new Error(response.statusText, {
        cause: { request, response: response.parsedBody },
      });
    }

    return response;
  }
}
