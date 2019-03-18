

		class Star{
			
			constructor(min,max){
				this.x = Math.floor(random(-canvas.width/2,canvas.width/2));
				this.y = Math.floor(random(-canvas.width/2,canvas.height/2));
				this.z = Math.floor(random(100,canvas.width));
				this.r = Math.floor(random(4,7));
				this.speed = 10;
			}
			
			static init(device){
				var n,min,max;
				if(device=='mob'){
					n = 50;
					min = 3;
					max = 7;
				}else{
					n = 100;
					min = 5;
					max = 10;
				}
				
				Star.stars = [];
				for(var i=0;i<n;++i){
					Star.stars[i] = new Star();
				}
			}
			static updateAll(ctx){
				Star.stars.forEach(
					star => {star.update(ctx);}
				);
			}
			
			update(ctx){
				this.z -= this.speed;
				if(this.z<0)
					Star.stars[Star.stars.indexOf(this)] = new Star();
				this.render(ctx);
			}
			
			render(ctx){
				var sx = map(this.x/this.z,0,1,0,canvas.width);
				var sy = map(this.y/this.z,0,1,0,canvas.height);
				
				var r = map(this.z,0,canvas.width,this.r,0);
			
				ctx.beginPath();
				ctx.strokeStyle= 'white';
				ctx.fillStyle= 'white';
				ctx.arc(sx,sy,r,0,Math.PI*2,true);
				ctx.stroke();
				ctx.fill();
				ctx.closePath();
				//alert();
			}
			
		}
		
		
		function glitch(string,x,y,offset,font){
			var disp_x = random(-offset,offset);
			var disp_y = 0;//random(-offset,offset);
			
			
			ctx.beginPath()
            ctx.strokeStyle = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
            ctx.fillStyle = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';//'rgba(0,255,0,0.8)';//'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
            //ctx.fillStyle = 'rgba(0,0,255,1)';
            ctx.font = ""+font+"px HACKED";
            ctx.textAlign = 'center';
			//ctx.fillText(string,x + random(-offset,offset),y + random(-offset,offset) );
            ctx.fillText(string,x + disp_x ,y + disp_y );
            ctx.closePath();
			
			ctx.beginPath()
            ctx.strokeStyle = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
            ctx.fillStyle = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';//'rgba(255,0,0,0.8)';
            //ctx.fillStyle = 'rgba(255,0,0,1)';
            ctx.font = ""+font+"px HACKED";
            ctx.textAlign = 'center';
            //ctx.fillText(string,x + random(-offset,offset),y + random(-offset,offset) );
            ctx.fillText(string,x - disp_x ,y - disp_y );
            ctx.closePath();
			
			ctx.beginPath();
            ctx.strokeStyle = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
            ctx.fillStyle = 'rgba(255,255,255,1)';
            ctx.font = ""+font+"px HACKED";
            ctx.textAlign = 'center';
            ctx.fillText(string,x,y);
            ctx.closePath();
			
		}