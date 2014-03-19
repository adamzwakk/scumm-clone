var scummbar = {
	imageLayers:[
		{
			type:'bg',
			image:'assets/scenes/scummbar/scummbar.png'
		},
		{
			type:'transporter'
		},
		{
			type:'player'
		},
		{
			type:'sprite'
		}
	],
	spawnStart:{
		x:170,
		y:300
	},
	large:2,
	largePadding:10,
	transporters:[
		{
			x:117,
			y:280,
			w:140,
			h:180,
			title:"Outside",
			link:0
		}
	],
	actors:[
		{
			a:mario,
			t:'p',
			x:600,
			y:300
		}
	]
};