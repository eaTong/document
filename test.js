const {getDocuments} = require("./server/services/documentServer");


(async () => {
  const data = await getDocuments('5c130c501a0b896754ca181b');
  console.log(data);
})();


