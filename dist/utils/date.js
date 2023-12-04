"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertStringToDate = exports.getFormattedDate = void 0;
const getFormattedDate = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
exports.getFormattedDate = getFormattedDate;
const convertStringToDate = (dateString) => {
    const parsedDate = new Date(dateString);
    return parsedDate;
};
exports.convertStringToDate = convertStringToDate;
