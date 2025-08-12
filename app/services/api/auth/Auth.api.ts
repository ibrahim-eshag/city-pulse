import { AxiosResponse } from "axios";
import { ApiEndPoint } from "../../../constants/api-endpoints";
import { ApiClient } from "../api-client";
import { AuthErrorHandler } from "./handler";
import { DeleteAccountResponse } from "./types";

// TODO: to see whether to remove it or leave it
export class AuthApi {
  async deleteAccount(): Promise<void> {
    try {
      let resp: AxiosResponse<DeleteAccountResponse>;
      try {
        resp = await ApiClient.delete(ApiEndPoint.profile.profile);
      } catch (error: any) {
        console.log("🚀 ~ AuthApi ~ deleteAccount ~ server error:", error);
        AuthErrorHandler.deleteAccountSeverError(error);
      }
      const response = resp!.data;
      return response;
    } catch (error) {
      console.log("🚀 ~ AuthApi ~ deleteAccount ~ error:", error);
      throw error;
    }
  }
}
