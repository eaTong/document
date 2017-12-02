/**
 * Created by eatong on 17-11-29.
 */
import Doc from '../schema/DocSchema';

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

async function updateDoc(data) {
  const doc = await Doc.findOne({catalog: data.catalog}) || new Doc(data);
  doc.content = data.content;
  await doc.save();
  return doc;

}

export default {getDocs, addDoc, deleteDoc, updateDoc}
