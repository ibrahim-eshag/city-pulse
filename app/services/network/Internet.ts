import {NoInternetConnectionError} from '@/app/models/errors/general/GeneralErrors';

// import * as Network from 'expo-network';

export class Internet {
    private static activeListener? = undefined;

    static async checkStatus() {
        try {
            // const {isConnected} = await NetInfo.refresh();
            // const {isConnected} = await Network.getNetworkStateAsync();
            const {isConnected} = {isConnected: true};
            if (!isConnected) {
                throw new NoInternetConnectionError();
            }
        } catch (error) {
            console.log('🚀Internet ~ checkStatus ~ error:', error);
            throw error;
        }
    }

    static async getIpAddress(): Promise<string> {
        try {
            // const ip: string = await publicIP();
            // const ip: string = await Network.getIpAddressAsync();
            const ip: string = "0.0.0.0";
            // const ip = netInfo.details?.ipAddress;
            return ip;
        } catch (error) {
            console.log('��� Internet ~ getIpAddress ~ error:', error);
            throw error;
        }
    }

    static setListener() {
        if (this.activeListener === undefined) return;
        // this.activeListener = NetInfo.addEventListener(_state => {
        // });
    }

    static removeListener() {
    }
}
