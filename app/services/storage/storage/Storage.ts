import AsyncStorage from '@react-native-async-storage/async-storage';
import {IStorage} from './types';

export class Storage implements IStorage {
    async save<T>(key: string, value: T): Promise<void> {
        const data = JSON.stringify(value);
        await AsyncStorage.setItem(key, data);
    }

    async get<T>(key: string): Promise<T> {
        const savedData = await AsyncStorage.getItem(key);
        return savedData ? JSON.parse(savedData) : null;
    }

    async deleteByKey(key: string): Promise<void> {
        await AsyncStorage.removeItem(key);
    }

    async clearStorage(): Promise<void> {
        await AsyncStorage.clear();
    }
}
