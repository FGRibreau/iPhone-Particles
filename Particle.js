function Particle(x, y){
	//Position initiale
	this.x = x;
	this.iy = this.y = y;
	
	// Vitesse initiale des particules
	var r1 = Math.random()
	,   r2 = Math.random();
	
	this.sx = Math.round((r1*200*(-1))+100);
	this.sy = Math.round((r2*200*(-1))+100);
	
	this.life = 1;
	
	this.rgba = '';
	
	this.color = [
	Math.round(r1*255),
	Math.round(r2*255),
	Math.round(Math.random()*255)];
}

Particle.prototype = {
	update: function(ParticleView){
		var s = 30;
		
		// Maj de la vitesse
		this.sy = this.sy + 10;
		
		// Maj de la position
		this.x = this.x + ((this.sx*s)/1000);
		this.y = this.y + ((this.sy*s)/1000);
		
		this.rgba = 'rgb(' +
		this.color[0] + ',' + 
		this.color[1] + ',' + 
		this.color[2] + ')';// + (ParticleView.sz[1]-this.y)/(ParticleView.sz[1]-this.iy) + ')';
		
		// Meurt s'il dépasse de l'écran
		if(this.y >= ParticleView.sz[1]-10){
			this.life = 0;
		}
	},
}
