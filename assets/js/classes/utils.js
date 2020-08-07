'use strict';

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const StringToBool = (string) => (string.toLowerCase() == 'true') ? true : false;