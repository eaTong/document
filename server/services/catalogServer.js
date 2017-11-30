/**
 * Created by eatong on 17-11-29.
 */
import Catalog from '../schema/CatalogSchema';

async function getCatalogs() {
  return await Catalog.find({enable: {$ne: false}});
}

async function addCatalog(data) {
  const catalog = new Catalog(data);
  return await catalog.save();
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
