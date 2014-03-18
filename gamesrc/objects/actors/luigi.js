var luigi = {
	name: 'luigi',
	path: 'assets/actors/luigi/luigi.png',
	actions: {
		walk: {
			up:[
				{ width: 20, height: 33, x: 3, y: 123 },
				{ width: 22, height: 36, x: 31, y: 120 },
				{ width: 20, height: 33, x: 61, y: 123 },
			],
			down:[
				{ width: 23, height: 35, x: 3, y: 2 },
				{ width: 22, height: 37, x: 31, y: 0 },
				{ width: 23, height: 35, x: 58, y: 2 },
			],
			right:[
				{ width: 21, height: 36, x: 3, y: 81 },
				{ width: 19, height: 37, x: 32, y: 80 },
				{ width: 22, height: 36, x: 59, y: 81 },
			],
			left:[
				{ width: 22, height: 36, x: 3, y: 41 },
				{ width: 19, height: 37, x: 33, y: 40 },
				{ width: 21, height: 36, x: 60, y: 41 },
			],
		},
		stand: {
			up:[
				{ width: 22, height: 36, x: 31, y: 120 },
			],
			down:[
				{ width: 22, height: 37, x: 28, y: 0 },
			],
			right:[
				{ width: 19, height: 37, x: 32, y: 80 },
			],
			left:[
				{ width: 19, height: 37, x: 33, y: 40 },
			],
		},
	}
};