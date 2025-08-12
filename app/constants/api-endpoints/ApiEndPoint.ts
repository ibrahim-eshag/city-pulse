export class ApiEndPoint {
  private static VERSION = "/v2";

  static BASE_URL = process.env.EXPO_PUBLIC_API_URL;

  static auth = {
    requestOtp: this.VERSION + "/auth/otp",
    login: this.VERSION + "/auth/mobile_login",
    logout: this.VERSION + "/auth/logout", // if a call has to be made to notify the server
  };

  static localEvent = {
    listLocalEvents: this.VERSION + "/events.json",
  };

  static profile = {
    profile: this.VERSION + "/profile",
  };
}
