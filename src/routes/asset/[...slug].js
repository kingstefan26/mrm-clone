import axios from "axios";
import sharp from "sharp";

export async function get({ params, url, request }) {

  // q = quality
  // (0-3)
  // 0|none = the og file,
  // 1 = datasaver
  // 2 = poster
  // 3 = very little jpg for loading screens

  // everything is avif then fallback to webp then jpg

  const { slug } = params;

  if (!slug.startsWith("storage/uploads")) {
    return {
      status: 404,
      message: "Not found"
    };
  }

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

  let data;

  const quality = url.searchParams.has("q") ? url.searchParams.get("q") : "0";

  const accets = request.headers.get("accept");

  if(accets.includes('image/avif')){
    switch (quality) {
      case "0" :
        data = response.data;
        break;
      case "1":
        data = await sharp(response.data)
          .avif({ quality: 60, effort: 2 })
          .toBuffer();
        break;
      case "2":
        data = await sharp(response.data).resize(180, 260)
          .avif({ quality: 60, effort: 2 })
          .toBuffer();
        break;
      case "3":
        data = await sharp(response.data).resize(30, 43)
          .avif({ quality: 1, effort: 2 })
          .toBuffer();
        break;

      default:
        data = response.data;
        break;
    }
  } else if (accets.includes('image/webp')) {
    switch (quality) {
      case "0" :
        data = response.data;
        break;
      case "1":
        data = await sharp(response.data)
          .webp()
          .toBuffer();
        break;
      case "2":
        data = await sharp(response.data).resize(180, 260)
          .webp()
          .toBuffer();
        break;
      case "3":
        data = await sharp(response.data).resize(30, 43)
          .webp()
          .toBuffer();
        break;

      default:
        data = response.data;
        break;
    }
  } else {
    switch (quality) {
      case "0" :
        data = response.data;
        break;
      case "1":
        data = await sharp(response.data)
          .jpeg()
          .toBuffer();
        break;
      case "2":
        data = await sharp(response.data).resize(180, 260)
          .jpeg()
          .toBuffer();
        break;
      case "3":
        data = await sharp(response.data).resize(30, 43)
          .jpeg()
          .toBuffer();
        break;

      default:
        data = response.data;
        break;
    }
  }



  return {
    status: 200,
    headers: {
      "cache-control": "public, max-age=31536000"
    },
    body: !data ? response.data : data
  };
}