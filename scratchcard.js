;(function(win){
	'use strict';
	
	var defaultUrl = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRuP49FSIiPIQeEmv4rMth3elbFO-Rq_3veKYUrsPoce8xl6SWQDYR5YQ"
	
	function ScratchCard(underlay,upperlay,imgurl,radius){
		this.$underlay = document.querySelector('.'+underlay);
		this.$upperlay = document.querySelector('.'+upperlay);
		this.imgurl = imgurl || defaultUrl;
		this.radius = radius || 15;
		this.rect = this.getUnderlayRect();
		this.dpr = window.devicePixelRatio;
		this.canvas = this.createCanvas();
		this.ctx = this.canvas.getContext('2d');
		this.bindEvent = function(){};
	}
	ScratchCard.prototype = {
		createCanvas:function(){
			var canvas = document.createElement('canvas');
			canvas.setAttribute('id','scratch');
			canvas.width = this.rect.width * this.dpr;
			canvas.height = this.rect.height * this.dpr;
			canvas.style.width = this.rect.width+'px';
			canvas.style.height = this.rect.height+'px';
			return canvas;
		},
		getUnderlayRect:function(){
			var underlay = this.$underlay
			return {
				width:underlay.offsetWidth,
				height:underlay.offsetHeight,
				left:underlay.offsetLeft,
				top:underlay.offsetTop
			}
		},
		drawImgToCanvas:function(){
			var that = this;
			var img = new Image();
			img.width = this.rect.width * this.dpr;
			img.height = this.rect.height * this.dpr;
			img.src = this.imgurl;
			img.crossOrigin = 'anonymous';
			img.onload = function(){
				that.ctx.drawImage(img,0,0,that.rect.width*that.dpr,that.rect.height*that.dpr);
			}
		},
		initCanvas:function(){
			this.$upperlay.appendChild(this.canvas);
			this.drawImgToCanvas();
			this._bindEvent();
			this.changePos();
		},
		_bindEvent:function(){
			var that = this;
			this.canvas.addEventListener('touchmove',function(e){
				that.fingerMove(e);
			},false);
		},
		fingerMove:function(e){
			var ctx = this.ctx;
			var pos = e.touches[0];
			var offsetX = this.rect.left;
			var offsetY = this.rect.top;
			ctx.globalCompositeOperation = 'destination-out';
			ctx.beginPath();
			ctx.arc(this.dpr*(pos.pageX-offsetX),this.dpr*(pos.pageY-offsetY),this.radius,0,Math.PI*2);
			ctx.fill();
			ctx.closePath();
			e.preventDefault();
		},
		changePos:function(){
			this.$underlay.parentNode.style.position = "relative";
			this.toAbs(this.$underlay,1);
			this.toAbs(this.$upperlay,2);

		},
		toAbs:function(ele,zIndex){
			ele.style.position = "absolute";
			ele.style.top = this.rect.top+'px';
			ele.style.left = this.rect.top+'px';
			ele.style.zIndex = zIndex;
		}
	}
	win.ScratchCard = ScratchCard;
})(window)


