import adapter from "@sveltejs/adapter-auto";
// import sw from "kit-sw-workbox";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  kit: {
    adapter: adapter(),
    vite: {
      define: {
        "process.env": process.env
      }
			// ,
      // plugins: [
      //   sw({ routes: ["/"] })
      // ]
    },

    // Override http methods in the Todo forms
    methodOverride: {
      allowed: ["PATCH", "DELETE"]
    }
  }
};

export default config;
