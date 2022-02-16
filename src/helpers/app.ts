import { Theme, ThemeState } from "typings/app";
import moment from "moment";
import {ListAppAccessPayload} from "../typings/support";

export const getInitialTheme = (): ThemeState => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return {
        theme: storedPrefs as Theme,
      };
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return {
        theme: "dark",
      };
    }
  }

  // If you want to use dark theme as the default, return "dark" instead
  return {
    theme: "light",
  };
};

export const rawSetTheme = (state: ThemeState): void => {
  const { theme } = state;

  const root = window.document.documentElement;
  const isDark = theme === "dark";

  root.classList.remove(isDark ? "light" : "dark");
  root.classList.add(theme);

  localStorage.setItem("color-theme", theme);
};

export const getWindowDimensions = (): {
  width: number;
  height: number;
} => {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
};

export const checkTimeType = ( timeType : any) => {
  const currentYear = new Date().getFullYear();
  let listParam : any = {}
  if(timeType === 'all') {
    listParam = {
      fromDate: moment().startOf('year').format("YYYY-MM-DD"),
      toDate: moment().endOf("year").format("YYYY-MM-DD"),
      year: currentYear
    }
  } else if(timeType === 'today') {
    listParam = {
      fromDate: moment().format("YYYY-MM-DD"),
      toDate: moment().format("YYYY-MM-DD"),
      year: currentYear
    }
  }else if(timeType === 'week') {
    listParam = {
      fromDate: moment().startOf('week').format("YYYY-MM-DD"),
      toDate: moment().endOf("week").format("YYYY-MM-DD"),
      year: currentYear
    }
  }else if(timeType === 'month') {
    listParam = {
      fromDate: moment().startOf('month').format("YYYY-MM-DD"),
      toDate: moment().endOf("month").format("YYYY-MM-DD"),
      year: currentYear
    }
  }else if(timeType === 'quarter') {
    listParam = {
      fromDate: moment().startOf('quarter').format("YYYY-MM-DD"),
      toDate: moment().endOf("quarter").format("YYYY-MM-DD"),
      year: currentYear
    }
  }else if(timeType === 'year') {
    listParam = {
      fromDate: moment().startOf('year').format("YYYY-MM-DD"),
      toDate: moment().endOf("year").format("YYYY-MM-DD"),
      year: currentYear
    }
  }
  return listParam;
}
