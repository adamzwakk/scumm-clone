var mi1Street = {
	imageLayers:[
		{
			type:'bg',
			image:'assets/scenes/mi1street/street.png'
		},
		{
			type:'transporter'
		},
		{
			type:'transporter'
		},
		{
			type:'item'
		},
		{
			type:'player'
		},
		{
			type:'sprite'
		}
	],
	large:1,
	largePadding:40,
	persPoint:
	{
		x:579,
		y:259
	},
	transporters:[
		{
			x:830,
			y:250,
			w:45,
			h:70,
			title:"SCUMM Bar",
			link:1
		},
		{
			x:344,
			y:254,
			w:20,
			h:30,
			title:"Test Room",
			link:2
		}
	],
	items:[
		{
			i:hammerItem,
			x:352,
			y:416
		}
	],
	actors:[
		{
			a:mario,
			t:'p',
			x:600,
			y:300
		},
		{
			a:luigi,
			t:'n',
			x:158,
			y:370
		}
	]
};