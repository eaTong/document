const Catalog = require('../server/schema/CatalogSchema');
const Doc = require('../server/schema/DocSchema');
const Document = require('../server/schema/DocumentSchema');

async function getAllCatalogs() {
  const catalogs = await Catalog.find({
    enable: {$ne: false},
    module: {$in: ['5bd81ad35c5e5b4e4330366a', '5c130c501a0b896754ca181b', '5c19f0a8eea2235c75a0d28e']}
  });
  const parentKeyMapping = {};
  catalogs.forEach(catalog => {
    catalog.children.forEach(item => {
      parentKeyMapping[item] = catalog._id.toString();
    })
  });

  const docMapping = {};

  const docs = await Doc.find();

  docs.forEach(doc => {
    docMapping[doc.catalog] = doc._doc;
  });

  const documents = catalogs.map(item => {
    const document = docMapping[item._id] || {};
    return {
      _id: item._id.toString(),
      name: item.name,
      introduction: item.introduction,
      icon: item.icon,
      level: item.level,
      sort: item.sort,
      thirdPartyKey: item.thirdPartyKey,
      module: item.module,
      parent: parentKeyMapping[item._id.toString()] || '',
      published: !!document.content,
      content: document.content,
      viewCount: document.viewCount,
    };
  });
  await Document.insertMany(documents);
}

(async () => {
  await getAllCatalogs();
  process.exit();
})();
