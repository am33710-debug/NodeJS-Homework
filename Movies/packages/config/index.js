const fs = require("fs");

const CONFIG_SOURCE = `${__dirname}/config.json`;

let config = null;

if (config === null) {
    const file = fs.readFileSync(CONFIG_SOURCE, "utf-8");
    config = JSON.parse(file);
} // if empty config, read the CONFIG_SOURCE

const getSection = (section) => {
    if (!config[section])
        throw `Configuration section ${section} does not exist`;

    return config[section]; // when using it outside of here, we use getSection(section)
};

module.exports = { getSection };