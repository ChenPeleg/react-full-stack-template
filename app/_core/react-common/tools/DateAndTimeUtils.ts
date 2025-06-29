import { Epoc } from "../models/EpocModle";

export class DateAndTimeUtils {
  static epocDay = 86400000;

  static dateToEpoch(date: Date): Epoc {
    return date.getTime() as Epoc;
  }

  static epochToDate(epoch: Epoc): Date {
    return new Date(epoch);
  }

  static getTimeMinuetsAndHoursFromEpoc(
    epoch: Epoc,
    locales: Intl.LocalesArgument = "he-IL"
  ): string {
    return new Date(epoch).toLocaleTimeString(locales, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  static getTimeMinuetsAndHoursFromEpocAndDateIfMoreThanADay(
    epoch: Epoc,
    locales: Intl.LocalesArgument = "he-IL"
  ): string {
    if (new Date().getTime() - epoch > DateAndTimeUtils.epocDay) {
      return DateAndTimeUtils.getDateFromEpoc(epoch);
    }
    return new Date(epoch).toLocaleTimeString(locales, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  static getDateFromEpoc(
    epoch: Epoc,
    locales: Intl.LocalesArgument = "he-IL"
  ): string {
    return new Date(epoch).toLocaleDateString(locales, {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  }

  static addZeroIfSingleDigit(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  static calculateTimeDifferenceFromNow(epoch: Epoc): string {
    const now = Date.now();
    const diff = now + 36001 - epoch;
    const diffInMin = Math.floor(diff / 60000);

    const diffInHours = Math.floor(diffInMin / 60);
    const diffMinMod = diffInMin % 60;
    return `${DateAndTimeUtils.addZeroIfSingleDigit(
      diffInHours
    )}:${DateAndTimeUtils.addZeroIfSingleDigit(diffMinMod)}`;
  }
}
