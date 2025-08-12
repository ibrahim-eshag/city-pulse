import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

// dayjs.extend('ar');

export class TimeFormatter {
    private static locale = 'ar';

    static dayjs = () => dayjs;

    static setLocale(locale: string) {
        TimeFormatter.locale = locale;
        // dayjs.locale = locale;
    }

    static formatDateTo(
        date: Date | string | dayjs.Dayjs,
        old: string,
        current?: string,
    ) {
        const dayjsObj = dayjs(date, old);
        return dayjsObj.locale(this.locale).format(current);
    }

    static getDateFrom(date: Date | string | dayjs.Dayjs, old?: string) {
        const dayjsObj = dayjs(date, old);
        return dayjsObj.toDate();
    }

    // static isAfter(date: Date | string | dayjs.Dayjs,)

    static isBetween(start: string, end: string, format?: string): boolean {
        const startTime = dayjs(start, format);
        const endTime = dayjs(end, format);

        const result = dayjs().isBetween(startTime, endTime);

        return result;
    }
}

export {dayjs};
