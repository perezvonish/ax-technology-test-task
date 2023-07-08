/* DO NOT EDIT, file generated by nestjs-i18n */

import { Path } from "nestjs-i18n";
export type I18nTranslations = {
    "en": {
        "exceptions": {
            "auth": {
                "register": {
                    "already": string;
                    "notTheSame": string;
                };
                "login": {
                    "passwordIncorrect": string;
                };
            };
            "user": {
                "notFound": string;
            };
            "posts": {
                "notFound": string;
            };
        };
        "validation": {
            "isString": string;
            "isNumber": string;
            "isEmail": string;
            "isStrongPassword": string;
        };
    };
    "ru": {
        "user": {
            "notFound": string;
            "already exists": string;
        };
        "register": {
            "passwordAreNotTheSame": string;
        };
        "login": {
            "passwordIncorrect": string;
        };
    };
};
export type I18nPath = Path<I18nTranslations>;
