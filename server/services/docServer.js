/**
 * Created by eatong on 17-11-29.
 */
const Doc = require('../schema/DocSchema');
const Catalog = require('../schema/CatalogSchema');
const {LogicError} = require('../framework/errors');

async function getDocs() {
  return await Doc.find({enable: {$ne: false}});
}

async function addDoc(data) {
  const doc = new Doc(data);
  return await doc.save();
}

async function deleteDoc(id) {
  const doc = await Doc.findById(id);
  doc.enable = false;
  await doc.save();
  return doc;
}

async function getDocByCatalog(catalogId, shouldAddCount) {
  const doc = await Doc.findOne({catalog: catalogId});
  const catalog = await Catalog.findById(catalogId);
  if (shouldAddCount) {
    doc.viewCount = doc.viewCount ? doc.viewCount + 1 : 1;
    await doc.save();
  }
  return {content: doc ? doc.content : '', catalog};
}

async function viewDocByThirdParty({thirdPartyKey, moduleId}, shouldAddCount) {
  const catalog = await Catalog.findOne({thirdPartyKey, module: moduleId});
  const doc = await Doc.findOne({catalog: catalog._id.toString(), published: true});
  if (shouldAddCount && doc) {
    doc.viewCount = doc.viewCount ? doc.viewCount + 1 : 1;
    await doc.save();
  }
  return {content: doc ? doc.content : '', catalog};
}

async function updateDoc(data, user) {
  let doc = await Doc.findOne({catalog: data.catalog});
  if (doc) {
    doc.content = data.content;
  } else {
    doc = new Doc(data);
    doc.createor = user._id;
    doc.createTime = new Date();
    const catalog = await Catalog.findById(data.catalog);
    catalog.hasDoc = true;
    await  catalog.save();
  }
  await doc.save();
  return doc;
}

async function publishDoc(data, user) {
  let doc = await Doc.findOne({catalog: data.catalog});
  if (doc) {
    doc.content = data.content;
    doc.publishContent = data.content;
    doc.lastPublishUser = user._id;
    doc.publishHistory.push({time: new Date(), content: doc.content, publishUser: user});
    const catalog = await Catalog.findById(data.catalog);
    catalog.published = true;
    await  catalog.save();
  } else {
    doc = new Doc(data);
    doc.createor = user._id;
    doc.createTime = new Date();
    doc.lastPublishUser = user._id;
    doc.publishHistory = [{time: new Date(), content: doc.content, publishUser: user}];
    //update catalog
    const catalog = await Catalog.findById(data.catalog);
    catalog.hasDoc = true;
    catalog.published = true;
    await  catalog.save();
  }
  await doc.save();
  return doc;
}

module.exports ={getDocs, addDoc, deleteDoc, updateDoc, publishDoc, getDocByCatalog, viewDocByThirdParty}
