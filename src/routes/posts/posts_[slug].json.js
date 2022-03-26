// https://jsonplaceholder.typicode.com/photos

import posts from './_postsdata.js';

export async function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;
	
	if(slug > 10){
		res.writeHead(404);
	
		res.end();
	}

	let page

	if(slug == 0){
		page = posts.slice(0, 9);
	}else {
		page = posts.slice((slug * 10) - 2, (slug * 10) + 9)
	}

	

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(page));
	
}