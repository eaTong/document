/**
 * Created by eatong on 17-11-29.
 */
import Doc from '../schema/DocSchema';
import Catalog from '../schema/CatalogSchema';

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

export default {getDocs, addDoc, deleteDoc, updateDoc}
