Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
})();

function iPhoneParticle(){
  this.pView = null;
  this.cvs = document.createElement('canvas');// canvas
  this.sz = null;// size
  
  this.init = function(){
      setTimeout(scrollTo, 0, 0, 1);
      
      this.updateCanvasSize();
      
  		document.body.appendChild(this.cvs);
  		
  		if (!this.cvs || !this.cvs.getContext) {
  		  return;
  		}
  		
  		this.ctx = this.cvs.getContext('2d');
  		if (!this.ctx) {
  		  return;
  		}

  		this.pView = new ParticlesView(this.cvs, this.ctx);
  };
  
  this.updateCanvasSize = function(){
    this.sz = iPhoneParticle.getSize();
    this.cvs.setAttribute('height', this.sz[1]+'px');
		this.cvs.setAttribute('width', this.sz[0]+'px');
  };
  
  this.rotate = function(){
    // Update canvas size
    this.updateCanvasSize();
    
    // Update ParticlesView .sz
    this.pView.updateSize();
  };
  
  var p = function(fct, ctx){return function(){fct.apply(ctx, arguments)};};
  
  this.init = p(this.init, this);
  this.rotate = p(this.rotate, this);
};

// Helpers
iPhoneParticle.getSize = function(){
	//http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
	var viewportwidth,
		viewportheight;

	// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	if (typeof window.innerWidth != 'undefined') {
		viewportwidth = window.innerWidth;
		viewportheight = window.innerHeight;
	} else if (typeof document.documentElement != 'undefined'
	&& typeof document.documentElement.clientWidth !='undefined' && document.documentElement.clientWidth != 0){
		// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document
		viewportwidth = document.documentElement.clientWidth;
		viewportheight = document.documentElement.clientHeight;
	} else {
	// older versions of IE
		viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
		viewportheight = document.getElementsByTagName('body')[0].clientHeight;
	}
	
	return [viewportwidth, viewportheight];
};