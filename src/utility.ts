export let romanNumerals = (function () {
  interface RomanNumbersMapDef {
    [key: string]: number;
  }

  interface SpecialSymbolsMapDef {
    [key: string]: string;
  }

  let romanNumbersMap: RomanNumbersMapDef = {
    I: 1,
    IV: 4,
    V: 5,
    IX: 9,
    X: 10,
    XL: 40,
    L: 50,
    XC: 90,
    C: 100,
    CD: 400,
    D: 500,
    CM: 900,
    M: 1000,
    F: 5000,
    G: 10000,
    H: 50000,
    J: 100000,
    K: 500000,
    R: 1000000,
  };

  let baseValuesList = [
    1000000, 500000, 100000, 50000, 10000, 5000, 1000, 900, 500, 400, 100, 90,
    50, 40, 10, 9, 5, 4, 1,
  ];

  // Symbols with bar
  let specialSymbolsMap: SpecialSymbolsMapDef = {
    F: "_V",
    G: "_X",
    H: "_L",
    J: "_C",
    K: "_D",
    R: "_M",
  };

  let romanNumber = "";

  function resetRomanNumber() {
    romanNumber = "";
  }

  // Converts roman numerals bar values to equivalent digit.
  function checkSpecialSymbol(romanNumber: string) {
    let newNumber = romanNumber;
    Object.keys(specialSymbolsMap).forEach((key) => {
      if (newNumber.indexOf(specialSymbolsMap[key]) !== -1) {
        newNumber = newNumber.split(specialSymbolsMap[key]).join(key);
      }
    });
    return newNumber;
  }

  // Convert digit equivalent bar value.
  function checkSpecialCharacter(romanDigit: string) {
    let newRomanDigit = romanDigit;
    if (Object.keys(specialSymbolsMap).indexOf(romanDigit) < 0) {
      return newRomanDigit;
    }
    return specialSymbolsMap[newRomanDigit];
  }

  function toRoman(decimalNumber: number): string {
    let baseValue = baseValuesList.find((b) => decimalNumber >= b);

    if (baseValue) {
      let dividedValue = decimalNumber / baseValue;
      let quotient = parseInt(dividedValue.toString().split(".")[0]);
      let remainder = decimalNumber % baseValue;

      // Find roman digit against base value
      let romanDigit = Object.keys(romanNumbersMap).find(
        (key) => romanNumbersMap[key] === baseValue
      );

      if (romanDigit) {
        romanNumber += checkSpecialCharacter(romanDigit).repeat(quotient);

        if (remainder === 0) {
          return romanNumber;
        } else {
          return toRoman(remainder);
        }
      } else {
        return "Value cannot be converted to roman number";
      }
    } else {
      return "Value cannot be converted to roman number";
    }
  }

  function fromRoman(rn: string): number {
    let decimalNumber = 0;
    let romanNumber = checkSpecialSymbol(rn);
    let romanNumberLength = romanNumber.length;

    for (let i = 0; i < romanNumberLength; i++) {
      let currentChar = romanNumber[i];
      let nextChar = romanNumber[i + 1];
      let currentCharValue = romanNumbersMap[currentChar];
      let nextCharValue = romanNumbersMap[nextChar];

      if (!currentCharValue) {
        return -1;
      }

      if (!!nextCharValue && currentCharValue < nextCharValue) {
        decimalNumber = decimalNumber + nextCharValue - currentCharValue;
      } else {
        decimalNumber = decimalNumber + currentCharValue;
      }
    }

    return decimalNumber;
  }

  return {
    toRoman,
    fromRoman,
    resetRomanNumber,
  };
})();
