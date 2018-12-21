/**
 * Created by eatong on 17-11-29.
 */
const Catalog = require('../schema/CatalogSchema');
const Doc = require('../schema/DocSchema');
const {$in} = require('mongoose');
const {LogicError} = require('../framework/errors');

async function getCatalogs(moduleId) {
  const catalogs = await Catalog.find({
    enable: {$ne: false},
    module: moduleId
  }).sort({level: -1});
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
      }).filter(cat => !!cat).sort((a, b) => a.sort - b.sort)
    };
    if (catalog.level === 0) {
      result.push(keyMap[catalog._id])
    }
  }
  return result.sort((a, b) => a.sort - b.sort);
}

async function addCatalog(data) {
  const catalog = new Catalog(data);
  catalog.level = catalog.level || 0;
  catalog.module = data.moduleId;
  await catalog.save();
  if (data.parent) {
    const parent = await Catalog.findById(data.parent);
    parent.children.push(catalog._id);
    await parent.save();
  }
  return catalog;
}

async function getChildrenOfCatalog(catalogId) {
  const catalog = await Catalog.findById(catalogId);
  if (catalog) {
    const children = await Catalog.find({_id: {$in: catalog.children}});
    return children.map(child => child._doc);
  }
  return []
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
  catalog.thirdPartyKey = data.thirdPartyKey;
  catalog.remark = data.remark;
  catalog.sort = data.sort;
  catalog.introduction = data.introduction;
  await catalog.save();
  return catalog;

}

async function authAddCatalog(data) {
  if (await Catalog.findOne({thirdPartyKey: data.thirdPartyKey, module: data.moduleId})) {
    throw new LogicError(`thirdPartyKey should be unique,info:{key:${data.thirdPartyKey},parent:{${data.parent}}`);
  }
  let catalog, parent;
  catalog = new Catalog(data);
  if (data.parent) {
    parent = await Catalog.findOne({thirdPartyKey: data.parent, module: data.moduleId});
    catalog.level = parent ? parent.level + 1 : 0;
  } else {
    catalog.level = 0;
  }
  await catalog.save();
  if (parent) {
    parent.children.push(catalog._id);
    await parent.save();
  }
  return catalog;
}

async function authUpdateCatalog(data) {
  const catalog = await Catalog.findOne(data.thirdPartyKey);
  catalog.name = data.name;
  catalog.remark = data.remark;
  catalog.icon = data.icon;
  catalog.sort = data.sort;
  catalog.introduction = data.introduction;
  await catalog.save();
  return catalog;
}

async function authDeleteCatalog(thirdPartyKey) {
  const catalog = await Catalog.findOne(thirdPartyKey);
  catalog.enable = false;
  await catalog.save();
  return catalog;

}

module.exports = {
  getCatalogs,
  addCatalog,
  deleteCatalog,
  updateCatalog,
  authAddCatalog,
  authUpdateCatalog,
  authDeleteCatalog,
  getChildrenOfCatalog,
};

