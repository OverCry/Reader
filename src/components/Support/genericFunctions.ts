import { useEffect, useState } from 'react';

export const phoneWidth = '540px';
export const tabletWidth = '840px';

export interface KeyValue {
  key: string[];
  value: number[];
}

export const commaStringNumber = (number: number) => {
  return number.toLocaleString();
};

export const formatTimeStamp = (e: number) => {
  const date = new Date(+e as number);
  const today = date.toLocaleDateString() === new Date(Date.now()).toLocaleDateString();
  let lastSeenString;
  if (today) {
    lastSeenString = date
      ? 'Today at ' +
        date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'Never';
  } else {
    lastSeenString = date
      ? date.toLocaleDateString() +
        ' at ' +
        date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'Never';
  }
  return lastSeenString;
};

export const formatTimeStampReccord = (e: number) => {
  const date = new Date(+e as number);
  const lastSeenString = date ? date.toLocaleDateString() + ' at ' + date.toLocaleTimeString() : 'Never';

  return lastSeenString;
};

export const filterIfExist = (input: string | undefined, filter: string): boolean => {
  if (filter === '') {
    return true;
  }
  if (input === undefined) {
    return false;
  }
  return input.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
};

export const capitalizeFirst = (word: string | string[] | undefined): string | undefined => {
  if (word) {
    let phrase: string[];
    if (typeof word === 'object') {
      phrase = word;
    } else {
      phrase = [word];
    }
    return phrase
      .map(wording => {
        return wording.charAt(0).toUpperCase() + wording.slice(1);
      })
      .join(', ');
  } else {
    return undefined;
  }
};

export const HasInternet = () => {
  const [isOnline, setOnline] = useState(window.navigator.onLine);
  const updateNetwork = () => {
    setOnline(window.navigator.onLine);
  };
  useEffect(() => {
    window.addEventListener('offline', updateNetwork);
    window.addEventListener('online', updateNetwork);
    return () => {
      window.removeEventListener('offline', updateNetwork);
      window.removeEventListener('online', updateNetwork);
    };
  });
  return isOnline;
};

export const HasLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const updateOnline = () => {
    navigator.geolocation.getCurrentPosition(
      () => {
        setHasLocation(true);
      },
      () => {
        setHasLocation(false);
      },
    );
  };
  useEffect(() => {
    updateOnline();
  });
  return hasLocation;
};

export const cleanLocal = () => {
  localStorage.removeItem('HOME');
  localStorage.removeItem('avaliableObjects');
};

export const cleanAll = () => {
  localStorage.clear();
};

export const roundNumber = (value: number, precision?: number): number => {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const sortNameAlphabetically = <T extends { name: string }>(list: T[]): T[] => {
  return list.sort((a, b) => {
    return a.name?.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  });
};

export const sortByKey = <T>(list: T[], key: keyof T): T[] => {
  return list.slice().sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    // Handle undefined values and ensure comparison is done only on strings
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue, undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return bValue - aValue; // bigger numbers first
    } else {
      return 0; // or handle other types as needed
    }
  });
};

/**
 * Generic helper function that can be used for the three operations:
 * @link https://stackoverflow.com/questions/33356504/difference-and-intersection-of-two-arrays-containing-objects
 * @param list1 first list
 * @param list2 second list
 * @param sortValue property of list to check equality by
 * */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const operation = (list1: any[], list2: any[], sortValue: string, isUnion: boolean = false) => {
  return list1.filter(
    (
      set => a =>
        isUnion === set.has(a[sortValue])
    )(new Set(list2.map(b => b[sortValue]))),
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const inBoth = (list1: any[], list2: any[], sortValue: string) => {
  return operation(list1, list2, sortValue, true);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const inFirstOnly = (list1: any[], list2: any[], sortValue: string) => {
  return operation(list1, list2, sortValue);
};

export const IsMobile = (): [isMobile: boolean, isLandscape: boolean] => {
  const [isMobile, setIsMobile] = useState(true);
  const [isLandscape, setIsLandscape] = useState(true);

  const updateSize = (): void => {
    const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

    const isAndroid = (): boolean => Boolean(userAgent.match(/Android/i));
    const isIos = (): boolean => Boolean(userAgent.match(/iPhone|iPad|iPod/i));

    setIsMobile(isAndroid() || isIos());

    if (window.innerWidth < window.innerHeight) {
      setIsLandscape(false);
    } else {
      setIsLandscape(true);
    }
  };

  useEffect(() => {
    window.addEventListener('orientationchange', updateSize, false);
    window.addEventListener('resize', updateSize, false);
    updateSize();
    return () => {
      window.removeEventListener('orientationchange', updateSize, false);
      window.removeEventListener('resize', updateSize, false);
    };
  }, []);

  return [isMobile, isLandscape];
};

export const IsLandscape = () => {
  const [landscape, setLandscape] = useState(window.matchMedia('(orientation: landscape)').matches);
  const updateOrientation = () => {
    setLandscape(window.matchMedia('(orientation: landscape)').matches);
  };
  useEffect(() => {
    window.addEventListener('orientationchange', updateOrientation, false);
    window.addEventListener('resize', updateOrientation, false);

    return () => {
      window.removeEventListener('orientationchange', updateOrientation, false);
      window.removeEventListener('resize', updateOrientation, false);
    };
  });
  return landscape;
};

export const ScreenWidthHeight = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return [width, height];
};

export const unixTimeToDay = (unixTimeMilli: number): string => {
  // Convert Unix time (milliseconds since Jan 1, 1970 UTC) to JavaScript Date object
  if (unixTimeMilli === 0) {
    return 'N/A';
  }
  const date = new Date(unixTimeMilli);

  return formatDate(date);
};

const formatDate = (date: Date): string => {
  const day: number = date.getDate();
  const month: number = date.getMonth() + 1; // Months are zero-based
  const year: number = date.getFullYear() % 100; // Get last two digits of the year
  // Add leading zeros if necessary
  const dayString: string = day < 10 ? '0' + day : day.toString();
  const monthString: string = month < 10 ? '0' + month : month.toString();
  const yearString: string = year < 10 ? '0' + year : year.toString();

  return `${dayString}/${monthString}/${yearString}`;
};

export const unixTimeToTime = (unixTimeMilli: number): string => {
  // Convert Unix time (milliseconds since Jan 1, 1970 UTC) to JavaScript Date object
  if (unixTimeMilli === 0) {
    return 'N/A';
  }
  const date = new Date(unixTimeMilli);

  return date.toLocaleTimeString('en-US');
};

export const isToday = (timeMilli: number): boolean => {
  const dateObj1 = new Date(timeMilli);
  const dateObj2 = new Date();

  // const { offset } = getLocationAndOffset();

  return dateObj1.toDateString() === dateObj2.toDateString();
  // Calculate the absolute difference in milliseconds
  // const diffInMilliseconds = Math.abs(dateObj1.getTime() - dateObj2.getTime());

  // // Convert milliseconds to hours
  // const diffInHours = diffInMilliseconds / Milliseconds.HOUR;
  // // Check if the difference is less than or equal to 24 hours
  // return diffInHours <= 24;
};

export default IsMobile;
