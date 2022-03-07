import moment from "moment";
import {
  DepartmentOnBudgetKey,
  DepartmentOnTimeKey,
  DEPARTMENT_STATUS,
} from "typings/ppt";

// Date loaded percentage
export const dateLoadedPercentage = (
  startDate: Date,
  endDate: Date,
  loadedDate: Date
): number => {
  const start = moment(startDate);
  const end = moment(endDate);
  const loaded = moment(loadedDate);
  const duration = moment.duration(end.diff(start));
  const durationLoaded = moment.duration(loaded.diff(start));
  return durationLoaded.asMilliseconds() / duration.asMilliseconds();
};

// Format date
export const formatDate = (date: Date): string => {
  return moment(date).format("DD/MM/YY");
};

// Switch ontime and budget return string
export const switchOnTimeBudget = (
  onTime: DepartmentOnTimeKey,
  budget: DepartmentOnBudgetKey
): { message: string; className: string } => {
  return DEPARTMENT_STATUS[onTime][budget];
};

// Format number locale
export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat("en-US").format(number);
};
export function fetchProfileData() {
  const userPromise = fetchUser();
  const postsPromise = fetchPosts();
  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise),
  };
}

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
function wrapPromise(promise: Promise<any>) {
  let status = "pending";
  let result: any;
  const suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}

function fetchUser() {
  console.log("fetch user...");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("fetched user");
      resolve({
        name: "Ringo Starr",
      });
    }, 60000);
  });
}

function fetchPosts() {
  console.log("fetch posts...");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("fetched posts");
      resolve([
        {
          id: 0,
          text: "I get by with a little help from my friends",
        },
        {
          id: 1,
          text: "I'd like to be under the sea in an octupus's garden",
        },
        {
          id: 2,
          text: "You got that sand all over your feet",
        },
      ]);
    }, 60000);
  });
}
