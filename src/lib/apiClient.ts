import axios, { AxiosResponse } from 'axios';
// import snakecaseKeys from 'snakecase-keys';

class ApiClient {
  constructor() {
    axios.defaults.baseURL = 'http://192.168.1.20:81';
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
    return axios.post(uri, body, {
      headers: {
        'Transfer-Encoding': 'chunked',
      },
    });
  }
}

export default new ApiClient();
