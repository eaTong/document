/**
 * Created by eatong on 17-11-29.
 */
const Document = require('../schema/DocumentSchema');
const {LogicError} = require('../framework/errors');
const nodejieba = require("nodejieba");

async function getDocuments(moduleId) {
  const documents = await Document.find({
    enable: {$ne: false},
    module: moduleId
  }, 'name icon introduction level sort thirdPartyKey parent module published viewCount').sort({level: 1});
  return structure(documents.map(item => item._doc));
}

async function getDocumentDetail({catalogId, shouldAddCount}) {
  const doc = await Document.findById(catalogId);
  if (shouldAddCount && doc) {
    doc.viewCount = doc.viewCount ? doc.viewCount + 1 : 1;
    await doc.save();
  }
  return doc;
}


async function search({moduleId, keywords}) {

}

function structure(documents) {
  const keyMap = {};
  const parentKeyMapping = {};

  for (let document of documents) {
    keyMap[document._id] = document;

    const parent = document.parent || '';
    if (!parentKeyMapping[parent]) {
      parentKeyMapping[parent] = [];
    }
    parentKeyMapping[parent].push(document);
  }

  function getChildren(parentId) {
    console.log(parentKeyMapping[parentId], parentId)
    return (parentKeyMapping[parentId] || []).map(item => ({...item, children: getChildren(item._id)}))
  }

  return getChildren('');
}

async function addDocument(data) {
  const document = new Document(data);
  document.level = document.level || 0;
  document.module = data.moduleId;
  await document.save();
  if (data.parent) {
    const parent = await Document.findById(data.parent);
    parent.children.push(document._id);
    await parent.save();
  }
  return document;
}

async function getChildrenOfDocument(documentId) {
  const document = await Document.findById(documentId);
  if (document) {
    const children = await Document.find({enable: true, _id: {$in: document.children}});
    return children.map(child => child._doc);
  }
  return []
}

async function deleteDocument(id) {
  const document = await Document.findById(id);
  document.enable = false;
  await document.save();
  return document;

}

async function updateDocument(data) {
  const document = await Document.findById(data.id);
  for(let key in data){
    document[key] = data[key];
  }

  await document.save();
  return document;

}

async function authAddDocument(data) {
  if (await Document.findOne({thirdPartyKey: data.thirdPartyKey, module: data.moduleId})) {
    throw new LogicError(`thirdPartyKey should be unique,info:{key:${data.thirdPartyKey},parent:{${data.parent}}`);
  }
  let document, parent;
  document = new Document(data);
  if (data.parent) {
    parent = await Document.findOne({thirdPartyKey: data.parent, module: data.moduleId});
    document.level = parent ? parent.level + 1 : 0;
  } else {
    document.level = 0;
  }
  await document.save();
  if (parent) {
    parent.children.push(document._id);
    await parent.save();
  }
  return document;
}

async function authUpdateDocument(data) {
  const document = await Document.findOne(data.thirdPartyKey);
  document.name = data.name;
  document.remark = data.remark;
  document.icon = data.icon;
  document.sort = data.sort;
  document.introduction = data.introduction;
  await document.save();
  return document;
}

async function authDeleteDocument(thirdPartyKey) {
  const document = await Document.findOne(thirdPartyKey);
  document.enable = false;
  await document.save();
  return document;

}

module.exports = {
  getDocuments,
  getDocumentDetail,
  search,
  addDocument,
  deleteDocument,
  updateDocument,
  authAddDocument,
  authUpdateDocument,
  authDeleteDocument,
};
