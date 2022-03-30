// https://jsonplaceholder.typicode.com/photos

import posts from './_postsdata.js';

/** @type {import('./[id]').RequestHandler} */
export async function get({ params }) {
	const slug = params.slug;

	if(slug > 10){

		return {
			status: 404,
			body: {
				message: 'Not Found'
			}
		};
	}

	let page

	if(slug === 0){
		page = posts.slice(0, 9);
	}else {
		page = posts.slice((slug * 10) - 2, (slug * 10) + 9)
	}


	return {
		status: 200,
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(page)
	};

}
