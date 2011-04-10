function Particle(x, y){
	// Inital position
	this.x = x;
	this.iy = this.y = y;
	
	// Initial speed
	var r1 = Math.random()
	,   r2 = Math.random();
	
	this.sx = Math.round((r1*200*(-1))+100);
	this.sy = Math.round((r2*200*(-1))+100);
	
	this.life = 1;
	
	this.rgba = '';
	
	this.color = [  Math.round(r1*255)
                ,	Math.round(r2*255)
                ,	Math.round(Math.random()*255)];
}

Particle.prototype = {
	update: function(ParticleView){
		var s = 30;
		
		// Update speed
		this.sy = this.sy + 10;
		
		// Update position
		this.x = this.x + ((this.sx*s)/1000);
		this.y = this.y + ((this.sy*s)/1000);
		
		this.rgba = 'rgb(' +this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ')';
		// + (ParticleView.sz[1]-this.y)/(ParticleView.sz[1]-this.iy) + ')';
		
		// Die die die !
		if(this.y >= ParticleView.sz[1]-10){
			this.life = 0;
		}
	},
}
