function ParticlesView(cvs, ctx){
	this.cvs = cvs; // canvas
	this.ctx = ctx; // ctx
	this.sz = null; // canvas size
	this.updateSize();
	
	// Particles array
	this.p = [];
	
	// Bind events
	var that = this; 
	cvs.addEventListener('mousedown', function(e){
		that.onMouseDown(e);
	});
	
	cvs.addEventListener('mousemove', function(e){
		that.onMouseMove(e);
	});
	
	cvs.addEventListener('mouseup', function(e){
		that.onMouseUp(e);
	});
	
	cvs.addEventListener('click', function(e){
		that.p.push(new Particle(e.offsetX, e.offsetY));
	});
	
	// Touch Support
	// http://www.sitepen.com/blog/2008/07/10/touching-and-gesturing-on-the-iphone/
	document.addEventListener("touchstart", this._(this.onTouch), true);
  document.addEventListener("touchmove", this._(this.onTouch), true);
	
	this._mousedownPos = [];
	this._mousedown = null;

  // Start to draw
  requestAnimFrame(this._(this.draw));
}

ParticlesView.prototype = {
	onMouseDown: function(e){
		if(e){//First
			this._mousedownPos = [e.offsetX, e.offsetY];
		}

    var i = 23;
    while(i--){
      this.p.push(new Particle(this._mousedownPos[0], this._mousedownPos[1]));
    }
		
		// Continuer à dessiner
		var that = this;
		this._mousedown = setTimeout(function(){
			that.onMouseDown();
		}, 10);
	},
	
	onMouseMove: function(e){
		
		if(e.offsetX != this._mousedownPos[0]
		|| e.offsetY != this._mousedownPos[1]){
			this._mousedownPos = [e.offsetX, e.offsetY];
		}
	},
	
	onMouseUp: function(e){
		clearTimeout(this._mousedown);
	},
	
	onTouch: function(e){
	  e.preventDefault();
	  
	  var t = e.changedTouches
	  ,   i = t.length
	  ,   et = null;
	  
	  while(i--){
	    et = t.item(i);
	    
	    var i = 2;
      while(i--){
        this.p.push(new Particle(et.clientX, et.clientY));
      }
      
	  }
	},
	
	draw: function(){
		var i = this.p.length;
		
		this.ctx.clearRect(0,0, this.sz[0], this.sz[1]);
		
		while(i--){
		  // Update particle speed & position
			this.p[i].update(this);
			
			if(this.p[i].life == 0){	
			  // Remove particle if needed
			  
				this.p.remove(i);
				
			} else {
			  
			  // Draw
				this.ctx.fillStyle = this.p[i].rgba;
				this.ctx.beginPath();
				this.ctx.arc(this.p[i].x, this.p[i].y, 3,  0, 2*Math.PI, true);
				this.ctx.fill();
				this.ctx.closePath();
			}
		}

		var that = this;
		setTimeout(function(){that.draw();}, 30/1000);
	},
	
	updateSize: function(){
	  this.sz = iPhoneParticle.getSize();
	},
	
	// Helper (== $.proxy)
	_: function(fct){
    var that = this;
    return function(){
      return fct.apply(that, arguments);
    }
  }
};