import aqs from "qs";


export async function get({ params }) {


  let body = "{\"message\": \"nah you slut\"}";


  const hostWithToken = `http://localhost:8080/api/collections/get/potss?${aqs.stringify( {
    populate: "1",
    filter: {
      title : params.id
    }
  })}`


  let response;

  try {
    response = await fetch(hostWithToken);
  }catch (_) {}



  if(response && response.ok){
    body = await response.text();
  }



  if(!(JSON.parse(body)).entries){
    return {
      status: 500,
      body: "eeeh"
    }

  }

  return {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: body
  };
}