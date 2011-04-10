function iPhoneParticle(){
  this.cvs = document.createElement('canvas');// canvas
  this.sz = null;// size
  this.pView = null;// ParticlesView
  
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
  
  // Make init & rotate contexte independent
  this.init = p(this.init, this);
  this.rotate = p(this.rotate, this);
};

// Helper
// http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
iPhoneParticle.getSize = function(){
	
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

// http://ejohn.org/blog/javascript-array-remove/
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
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
