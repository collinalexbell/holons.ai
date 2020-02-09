
export const css = (cssObj: {[key: string]: string}): string => {
  let str = '';
  for(const item in cssObj) {
    str += `${item}: ${cssObj[item]};`;
  }
  return str;
};

