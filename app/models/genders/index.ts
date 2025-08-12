export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export interface Serializable {
    toJson(): object;
}
