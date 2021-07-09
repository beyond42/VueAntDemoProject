export const checkNumberInput = async (_rule, value) => {
  // ? 'rule' is declared but its value is never read
  // ? Fix with
  // ? Prefix 'rule' with an underscore '_rule'
  if (!value) {
    return Promise.reject("Please input no of days");
  }

  if (!Number.isInteger(value)) {
    return Promise.reject("Please input digits");
  } else {
    // * Primjer ako neko polje treba biti vece od 2
    if (value < 2) {
      return Promise.reject("Day must be greater than 2");
    } else {
      return Promise.resolve();
    }
  }
};

export const checkNumberInputGeneral = async (_rule, value) => {
  if (!value) {
    return Promise.reject("Please input number");
  }

  if (!Number.isInteger(value)) {
    return Promise.reject("Please input digits");
  } else {
    return Promise.resolve();
  }
};

export const checkTextInputGeneral = async (_rule, value) => {
  if (!value) {
    return Promise.reject("Please input text");
  }
  return Promise.resolve();
};

export default {
  checkTextInputGeneral,
  checkNumberInputGeneral,
  checkNumberInput,
};
