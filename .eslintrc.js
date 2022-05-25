module.exports = {
    "env": {
        "node": true,
        "jest": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "jest/expect-expect":"off"
    }
};