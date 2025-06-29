import { appConfig } from "~/configuration/appConfig";


export class DateTimeFactory {
    Date: DateConstructor;
    constructor() {
        if (appConfig.environment ===  'test') {
            this.#allowToMockDate = true;
        }
        this.Date = this.nativeDateObject;
    }

    setDateMocking = (value: any) => {
        if (!this.#allowToMockDate) {
            throw new Error('Date mocking is not allowed');
        }
        if (!value) {
            throw new Error('Date mocking value is required');
        }
        this.#dateMockValue = value;
        this.Date = this.#MockedDateConstructor() as unknown as DateConstructor;
    };

    resetDateMocking = () => {
        if (!this.#allowToMockDate) {
            throw new Error('Date mocking is not allowed');
        }
        this.#dateMockValue = null;
        this.Date = this.nativeDateObject;
    };

    #dateMockValue = null;
    #allowToMockDate = false;
    nativeDateObject = Date;
    /**
     * @description if dateParams is not provided, it will return the mocked date
     *  (now) else it will return the date object based on the dateParams
     */
    #MockedDateConstructor = (): ((arg0: any) => Date) | any => {
        const fakeDate = this.#dateMockValue;
        const dateConstructor = function (dateParams: any) {
            if (dateParams) {
                return new Date(dateParams);
            }
            // @ts-ignore
            return new Date(fakeDate);
        };
        // @ts-ignore
        dateConstructor.now = () => new Date(fakeDate);
        // @ts-ignore
        dateConstructor.parse = (dateString) => Date.parse(dateString);
        // @ts-ignore
        dateConstructor.UTC = (...args) => Date.UTC(...args);
        return dateConstructor;
    };
}

export const Clock = new DateTimeFactory();
