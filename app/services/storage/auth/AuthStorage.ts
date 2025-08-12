import {Storage} from '../storage';
import {Account} from "@/app/services/storage/auth/types";

export class AuthStorage {
    static AUTH_TOKEN_KEY = '@AUTH_TOKEN_STORAGE_KEY';
    static AUTH_ACCOUNT_KEY = '@AUTH_ACCOUNT_KEY';

    private storage = new Storage();

    getToken = async () => {
        const token = await this.storage.get<string>(AuthStorage.AUTH_TOKEN_KEY);
        return token;
    };

    saveToken = async (token: string) => {
        await this.storage.save(AuthStorage.AUTH_TOKEN_KEY, token);
    };

    getAccount = async (): Promise<Account> => {
        const account = await this.storage.get<Account>(AuthStorage.AUTH_ACCOUNT_KEY);
        return account;
    };

    saveAccount = async (account: Account) => {
        await this.storage.save(AuthStorage.AUTH_ACCOUNT_KEY, account);
    };


    clear = async (): Promise<void> => {
        await this.storage.deleteByKey(AuthStorage.AUTH_TOKEN_KEY);
        await this.storage.deleteByKey(AuthStorage.AUTH_ACCOUNT_KEY);
    };
}
