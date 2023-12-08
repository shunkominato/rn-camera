import axios, { AxiosResponse } from 'axios';
// import snakecaseKeys from 'snakecase-keys';
export type aa = any;

class ApiClient {
  constructor() {
    axios.defaults.baseURL = 'http://127.0.0.1:81';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  private _setToken() {
    console.log('set token');
  }

  get<T>({ uri, params }: { uri: string; params?: object }): Promise<AxiosResponse<T>> {
    this._setToken();

    return axios.get(uri, { params });
  }

  post<T>({ uri, body }: { uri: string; body?: object }): Promise<AxiosResponse<T>> {
    this._setToken();

    // return axios.post(uri, body ? snakecaseKeys(body, { deep: true }) : body);
    return axios.post(uri, body);
  }
}

export default new ApiClient();
