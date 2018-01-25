/** @format */
export const data = {
	doodles: {
		items: {
			1: {
				id: 1,
				type: 'doodle',
				title: {
					rendered: 'WordPress Query Component Tests',
				},
				excerpt: {
					rendered: 'excerpt',
					protected: false,
				},
				link: 'https://wpapi.local/2016/10/wordpress-query-component-tests',
			},
			2: {
				id: 2,
				type: 'doodle',
				title: {
					rendered: 'Another Test Doodle',
				},
				excerpt: {
					rendered: 'excerpt',
					protected: false,
				},
				link: 'https://wpapi.local/2016/11/another-test-doodle',
			},
		},
		totalPages: {
			'{"sticky":false,"page":1}': '2',
		},
		queryRequests: {
			'{"sticky":false,"page":1}': false,
		},
		queries: {
			'{"sticky":false,"page":1}': [ 1, 2 ],
		},
	},
};
