import {Locale} from '@/app/locale';
import {IError} from '../types';

export class GeneralErrors {
    static NO_INTERNET = 1000;
    static OUT_OF_DATE = 1100;
    static UNRECOGNIZED_SERVER_ERROR = 1200;

    static ERRORS_CODES = [
        GeneralErrors.NO_INTERNET,
        GeneralErrors.OUT_OF_DATE,
        GeneralErrors.UNRECOGNIZED_SERVER_ERROR,
    ];
}

export class NoInternetConnectionError implements IError {
    code: number = GeneralErrors.NO_INTERNET;
    title: string;
    desc: string;
    codeString: string;

    constructor(code?: number, title?: string, desc?: string) {
        this.codeString = `${this.code}-${code}`;
        this.title = title || Locale.strings('errors.general.no_internet.title');
        this.desc = desc || Locale.strings('errors.general.no_internet.desc');
    }
}

export class OutOfDateError implements IError {
    code: number = GeneralErrors.OUT_OF_DATE;
    title: string;
    desc: string;
    codeString: string;

    constructor(code?: number, title?: string, desc?: string) {
        this.codeString = `${this.code}-${code}`;
        this.title = title || Locale.strings('errors.general.out_of_date.title');
        this.desc = desc || Locale.strings('errors.general.out_of_date.desc');
    }
}

export class ServerError implements IError {
    code: number = GeneralErrors.UNRECOGNIZED_SERVER_ERROR;
    title: string;
    desc: string;
    codeString: string;

    constructor(code?: number, title?: string, desc?: string) {
        this.codeString = `${this.code}-${code}`;
        this.title = title || Locale.strings('errors.general.server_error.title');
        this.desc = desc || Locale.strings('errors.general.server_error.desc');
    }
}

export class GeneralServerError implements IError {
    constructor(public code: number, public title: string, public desc: string) {
        // this.codeString = `${this.code}`;
        // this.code = 1;
    }
}

export class GeneralError implements IError {
    code: number = GeneralErrors.UNRECOGNIZED_SERVER_ERROR;
    title: string;
    desc: string;
    codeString: string;

    constructor(code?: number, title?: string, desc?: string) {
        this.codeString = `${this.code}-${code}`;
        this.title = title || Locale.strings('errors.general.error.title');
        this.desc = desc || Locale.strings('errors.general.error.desc');
    }
}
