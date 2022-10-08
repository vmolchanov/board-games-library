const readline = require('readline');

const prompt = (text) => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    readlineInterface.question(text, (answer) => {
      readlineInterface.close();
      resolve(answer);
    });
  });
};

/**
 * Преобразует строку в формат PascalCase
 * @param {string} str
 * @returns {string}
 */
const toPascalCase = (str) => {
  return str
    .split('-')
    .map(el => el.charAt(0).toUpperCase() + el.slice(1))
    .join('');
}

/**
 * Преобразует строку в формат kebab-case
 * @param {string} str
 * @returns {string}
 */
const toKebabCase = (str) => {
  str = toCamelCase(str)
  const matches = str.match(/[A-Z]/g)
  return str
    .split(/[A-Z]/)
    .map((el, i) => i === 0 ? el : matches.shift().toLowerCase() + el)
    .join('-');
}

/**
 * Преобразует строку в формат camelCase
 * @param {string} str
 * @returns {string}
 */
const toCamelCase = (str) => {
  return toPascalCase(str).charAt(0).toLowerCase() + toPascalCase(str).slice(1);
}

module.exports = {
  prompt,
  toCamelCase,
  toKebabCase,
  toPascalCase,
};
