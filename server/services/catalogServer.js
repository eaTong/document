/**
 * Created by eatong on 17-11-29.
 */
import Catalog from '../schema/CatalogSchema';
import Doc from '../schema/DocSchema';
import {LogicError} from "../framework/errors";

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
      }).filter(cat => !!cat)
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
    await parent.save();
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

async function authAddCatalog(data) {
  const a = await Catalog.findOne({thirdPartyKey: data.thirdPartyKey, module: data.moduleId});
  console.log(a);
  if (a) {
    throw new LogicError('thirdPartyKey should be unique');
  }
  let catalog, parent;
  catalog = new Catalog(data);
  catalog.module = data.moduleId;
  catalog.thirdPartyKey = data.thirdPartyKey;
  if (data.parent) {
    parent = await Catalog.findOne({thirdPartyKey: data.parent});
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
  await catalog.save();
  return catalog;
}

async function authDeleteCatalog(id) {
  const catalog = await Catalog.findOne(thirdPartyKey);
  catalog.enable = false;
  await catalog.save();
  return catalog;

}

export default {
  getCatalogs,
  addCatalog,
  deleteCatalog,
  updateCatalog,
  authAddCatalog,
  authUpdateCatalog,
  authDeleteCatalog
}
