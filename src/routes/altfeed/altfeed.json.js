import Cockpit from "$lib/api/cockpit.js";

export async function get() {

  const cockpit = new Cockpit({ host: "http://localhost", token: "d1ec6a873a7b1ac487638748f3fbb5" });

  let body = '{"message": "nah you slut"}';

  // await cockpit.collectionEntries('potss').then((entries) => {
  //   body = entries;
  // });
  await cockpit.fetchDataText("/api/collections/get/potss", { method: "GET" }, { populate: "1" }).then((entries) => {
    body = entries;
  });

  return {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: body
  };
}
