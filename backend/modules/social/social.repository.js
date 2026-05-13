const { SocialLink } = require('../../models');

const PLATFORMS = ['facebook', 'instagram', 'youtube'];

// Ensure all default rows exist
const seedDefaults = async () => {
    for (const platform of PLATFORMS) {
        await SocialLink.findOrCreate({
            where: { platform },
            defaults: { platform, url: '' }
        });
    }
};

const getAll = async () => {
    await seedDefaults();
    const rows = await SocialLink.findAll({ order: [['platform', 'ASC']] });
    // Return as a plain object { facebook, instagram, youtube }
    return rows.reduce((acc, row) => {
        acc[row.platform] = row.url;
        return acc;
    }, {});
};

const updateAll = async (links) => {
    for (const [platform, url] of Object.entries(links)) {
        await SocialLink.upsert({ platform, url });
    }
    return getAll();
};

module.exports = { getAll, updateAll };
