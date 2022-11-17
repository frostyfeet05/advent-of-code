export const input = ``;

export type Passport = {
    byr: string;
    iyr: string;
    eyr: string;
    hgt: string;
    hcl: string;
    ecl: string;
    pid: string;
    cid?: string;
}

export const Passport = {
    parse: (input: string): Passport[] => {
        return input.split('\n\n').map(line => {
            return line.split(/\s/).reduce((passport: Passport, attr) => {
              const [key, value] = attr.split(':');
              return {...passport, [key]: value};
            }, {} as Passport) || {} as Passport;
        });
    },
    isValid: (passport: Passport): boolean => {
        return passport.byr !== undefined &&
            passport.iyr !== undefined &&
            passport.eyr !== undefined &&
            passport.hgt !== undefined &&
            passport.hcl !== undefined &&
            passport.ecl !== undefined &&
            passport.pid !== undefined;
    },
    isBirthYearValid: (byr: string): boolean => {
        const birthYear: number = parseInt(byr);
        return birthYear >= 1920 && birthYear <= 2002;
    },
    isIssueYearValid: (iyr: string): boolean => {
        const issueYear: number = parseInt(iyr);
        return issueYear >= 2010 && issueYear <= 2020;
    },
    isExpirationYearValid: (eyr: string): boolean => {
        const expirationYear: number = parseInt(eyr);
        return expirationYear >= 2020 && expirationYear <= 2030;
    },
    isHeightValid: (hgt: string): boolean => {
        const height: string[] = hgt.match(/(\d+)(in|cm)/)?.map(x => x) || [];
        if (height.length !== 3) {
            return false;
        }
        const [_, valueStr, unit] = height;
        const value = parseInt(valueStr);

        if (unit === 'cm') {
            return value >= 150 && value <= 193;
        } else if (unit === 'in') {
            return value >= 59 && value <= 76;
        }
        return false;
    },
    isHairColorValid: (hcl: string): boolean => {
        return /#[0-9a-f]{6}/.test(hcl);
    },
    isEyeColorValid: (ecl: string): boolean => {
        return /(amb|blu|brn|gry|grn|hzl|oth)/.test(ecl);
    },
    isPassportIdValid: (pid: string): boolean => {
        return /^[0-9]{9}$/.test(pid);
    },
    isDataValid: (passport: Passport): boolean => {
        return Passport.isValid(passport) &&
            Passport.isBirthYearValid(passport.byr) &&
            Passport.isIssueYearValid(passport.iyr) &&
            Passport.isExpirationYearValid(passport.eyr) &&
            Passport.isHeightValid(passport.hgt) &&
            Passport.isHairColorValid(passport.hcl) &&
            Passport.isEyeColorValid(passport.ecl) &&
            Passport.isPassportIdValid(passport.pid);
    }
}
