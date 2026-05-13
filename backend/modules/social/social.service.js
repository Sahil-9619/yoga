const repo = require('./social.repository');

const getAll = () => repo.getAll();
const updateAll = (links) => repo.updateAll(links);

module.exports = { getAll, updateAll };
