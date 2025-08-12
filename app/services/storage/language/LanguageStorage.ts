import {Storage} from '../storage';

export class LanguageStorage {
    private storage = new Storage();

    async getLanguageKey(): Promise<string> {
        const savedData = await this.storage.get<string>(
            LanguageStorage.LANGUAGE_STORAGE_KEY,
        );
        return savedData || 'ar';
    }

    async saveLanguageKey(key: string): Promise<void> {
        await this.storage.save(LanguageStorage.LANGUAGE_STORAGE_KEY, key);
    }

    private static LANGUAGE_STORAGE_KEY = '@LANGUAGE_STORAGE_KEY';
}
