export interface IStorage {
    save<T>(key: string, value: T): void;

    get<T>(key: string): Promise<T>;
}
