export type LocalizationType = 'ar' | 'en';

export type LocalizationItemType = {
    id: LocalizationType;
    label: string;
    icon: string;
    RTL: boolean;
};

export type LocalizationListType = {
    [key in LocalizationType]: LocalizationItemType;
};

export const LocalizationList: LocalizationListType = {
    ar: {
        id: 'ar',
        label: 'العربية',
        icon: 'ع',
        RTL: true,
    },
    en: {
        id: 'en',
        label: 'English',
        icon: 'E',
        RTL: false,
    },
};
