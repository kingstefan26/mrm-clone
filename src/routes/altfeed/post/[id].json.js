import Cockpit from "$lib/api/cockpit.js";

export async function get({ params }) {

  const cockpit = new Cockpit({ host: "http://localhost:8080", token: "d1ec6a873a7b1ac487638748f3fbb5" });

  let body = "{\"message\": \"nah you slut\"}";


  await cockpit.fetchText("/api/collections/get/potss", { method: "GET" }, {
    populate: "1",
    filter: {
      title : params.id
    }
  }).then((entries) => {
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