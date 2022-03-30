import axios from "axios";
import sharp from "sharp";

export async function get({ params}) {


  const { slug } = params;

  const requeste = {
    method: "get",
    url: `http://localhost:8080/${slug}`,
    responseType: "arraybuffer"
  };

  const response = await axios(requeste);


  if (!response.headers["content-type"].startsWith("image/")) {
    return {
      status: 404,
      body: "error"
    };
  }

  const image = await sharp(response.data)
  const metadata = await image.metadata()


  return {
    status: 200,
    contentType: 'application/json',
    headers: {
      "cache-control": "public, max-age=31536000"
    },
    body: JSON.stringify({width: metadata.width, height: metadata.height})
  };
}