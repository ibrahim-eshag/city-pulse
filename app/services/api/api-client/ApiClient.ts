import axios, {
  AxiosError,
  // AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiEndPoint } from "@/app/constants/api-endpoints";
import Store from "@/app/redux";
import { Locale } from "@/app/locale";
import { AuthStorage } from "@/app/services/storage/auth";
import RNRestart from "react-native-restart";

const authStorage = new AuthStorage();

const authHeader = () => ({
  Authorization: `Bearer ${authStorage.getToken()}`,
});

const Client = axios.create({
  baseURL: ApiEndPoint.BASE_URL,
  headers: {
    "X-App-Client-Id": "PUBLIC_APP",
    "X-App-Client-Secret":
      "fdc127e7894a15e779c8bae05c1b3c5d5aed4eb4468b9c4e5c75f03ec39d7b2d",
    // ...authHeader()
  },
});

const requestSuccessInterceptor = (config: InternalAxiosRequestConfig) => {
  const state = Store.getState();
  // const token = state.auth.token;

  // config.headers.Authorization = token;
  config.headers["Content-Type"] = "application/json";
  config.headers["accept-language"] = Locale.currentLocale;
  console.log("------------------------- START API -------------------------");

  console.log("REQUEST BODY", JSON.stringify(config.data, null, 2));
  console.log("REQUEST PARAMS", JSON.stringify(config.params, null, 2));

  return config;
};

const requestFailedInterceptor = async (error: AxiosError) => {
  console.log(
    "🚀 ~ file: ApiClient.ts:29 ~ requestFailedInterceptor ~ error:",
    { ...error.response },
    null,
    2
  );
  return Promise.reject(error);
};

const responseSuccessInterceptor = (resp: AxiosResponse) => {
  console.log("METHOD", JSON.stringify(resp.config.method, null, 2));
  console.log("URL", JSON.stringify(resp.config.url, null, 2));
  console.log(
    "TOKEN",
    JSON.stringify(resp.config.headers.Authorization, null, 2)
  );

  // console.log('DATA ---- ', JSON.stringify(resp.data, null, 2));
  console.log(
    "---------------------------------- END ----------------------------------"
  );
  return resp;
};

const responseFailedInterceptor = async (error: any) => {
  console.log(
    "🚀 ~ file: ApiClient.ts:45 ~ responseFailedInterceptor ~ error:",
    JSON.stringify({ ...error.response?.data }, null, 2)
  );

  throw error;
};

Client.interceptors.request.use(async (config) => {
  // do something before executing the request
  // For example tag along the bearer access token to request header or set a cookie
  const requestConfig = config;
  const { headers } = config;
  const token = await authStorage.getToken();

  if (token) {
    requestConfig.headers = new axios.AxiosHeaders({
      ...headers,
      Authorization: `Bearer ${token}`,
    });
  } else {
    const basicAuthCredentials = btoa(
      "PUBLIC_APP:fdc127e7894a15e779c8bae05c1b3c5d5aed4eb4468b9c4e5c75f03ec39d7b2d"
    );
    requestConfig.headers = new axios.AxiosHeaders({
      ...headers,
      Authorization: `Basic ${basicAuthCredentials}`,
    });
  }
  return requestConfig;
});

Client.interceptors.request.use(
  requestSuccessInterceptor,
  requestFailedInterceptor
);
Client.interceptors.response.use(
  (response) => {
    if (response.config.url === "/auth/mobile_login") {
      // reload yhe app to reflect the updates on the UI
      setTimeout(() => window.location.reload(), 500);
    }
    return response;
  },
  (error) => {
    /**
     * Do something in case the response returns an error code [3**, 4**, 5**] etc
     * For example, on token expiration retrieve a new access token, retry a failed request etc
     */

    const { response } = error;
    const originalRequest = error.config;
    console.log("Original request:: ", originalRequest);
    if (response) {
      //
      if (response.status === 500) {
        // do something here
        return response;
      }
      if (response.status === 401) {
        console.log("UNAUTHORIZED interceptor");
        authStorage.clear();
        RNRestart.restart();
        return;
      }
      if (response.status > 300 && response.status < 500) {
        // client error
        return response;
      }
      return response;
    }
    return Promise.reject(error);
  }
);
// Client.interceptors.response.use(
//     responseSuccessInterceptor,
//     responseFailedInterceptor,
// );

export { Client };
