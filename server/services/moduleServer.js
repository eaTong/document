/**
 * Created by eatong on 17-11-29.
 */
import Module from '../schema/ModuleSchema';

async function getModules() {
  return await Module.find({enable: {$ne: false}});
}

async function addModule(data) {
  const module = new Module(data);
  return await module.save();
}

async function deleteModule(id) {
  const module = await Module.findById(id);
  module.enable = false;
  await module.save();
  return module;

}

async function updateModule(data) {
  const module = await Module.findById(data.id);
  module.name = data.name;
  module.remark = data.remark;
  await module.save();
  return module;

}

export default {getModules, addModule, deleteModule, updateModule}
