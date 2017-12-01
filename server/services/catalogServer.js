/**
 * Created by eatong on 17-11-29.
 */
import Catalog from '../schema/CatalogSchema';

async function getCatalogs(moduleId) {
  const catalogs = await Catalog.find({
    enable: {$ne: false},
    module: moduleId
  }).select('level name children').sort({level: -1});
  return structure(catalogs);
}

function structure(catalogs) {
  const keyMap = {};
  const result = [];
  for (let catalog of catalogs) {
    keyMap[catalog._id] = {
      ...catalog._doc,
      children: catalog.children.map(key => {
        return keyMap[key];
      })
    };
    if (catalog.level === 0) {
      result.push(keyMap[catalog._id])
    }
  }
  return result;
}

async function addCatalog(data) {
  const catalog = new Catalog(data);
  catalog.level = catalog.level || 0;
  catalog.module = data.moduleId;
  await catalog.save();
  if (data.parent) {
    const parent = await Catalog.findById(data.parent);
    parent.children.push(catalog._id);
    parent.save();
  }
  return catalog;
}

async function deleteCatalog(id) {
  const catalog = await Catalog.findById(id);
  catalog.enable = false;
  await catalog.save();
  return catalog;

}

async function updateCatalog(data) {
  const catalog = await Catalog.findById(data.id);
  catalog.name = data.name;
  catalog.remark = data.remark;
  await catalog.save();
  return catalog;

}

export default {getCatalogs, addCatalog, deleteCatalog, updateCatalog}
