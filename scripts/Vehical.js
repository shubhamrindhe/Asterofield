	
	
	function Vehical(x,y){
		this.mass = 1;
		this.position ={
			x : x,
			y : y
		}
		this.speed = 5;
		this.velocity ={
			x : 0,
			y : -this.speed
		}
		this.accelaration ={
			x : 0,
			y : 0
		}
		
		this.w = 6;
		this.h = 12;
		
		this.hitpoints = 100;
		
		this.phase;
		this.r = Math.sqrt(this.w*this.w+this.h*this.h);
		this.maxForce =0.5;
		
		
		this.update = function(){
			
			this.position.x += this.velocity.x;
			this.position.y += this.velocity.y;
			
			this.velocity.x += this.accelaration.x;
			this.velocity.y += this.accelaration.y;
			
			this.accelaration.x = 0;
			this.accelaration.y = 0;
			
			
		
		}
		
		this.applyForce = function(force){
			this.accelaration.x += force.x/this.mass;
			this.accelaration.y += force.y/this.mass;
			
			this.phase = Math.atan2(this.velocity.y,this.velocity.x) + Math.PI/2 ;
		}
		
		this.seek = function(target){
			var desired = {
				x : target.x - this.position.x,
				y :	target.y - this.position.y
			}
			var temp = r(desired.x,desired.y,0,0);
			desired.x = this.speed * (desired.x / temp);
			desired.y = this.speed * (desired.y / temp);
			
			var steer ={
				x : desired.x- this.velocity.x ,
				y : desired.y- this.velocity.y
			}
			
			
			
			var temp2 = r(steer.x,steer.y,0,0);
			steer.x = this.maxForce * (steer.x / temp2);
			steer.y = this.maxForce * (steer.y / temp2);
			
			
			
			
			
			
			this.applyForce(steer);
			//return steer;
		}
		this.eat = function(list){
			var record = Infinity;
			var nearest = -1;
			for(var i=0;i<list.length;++i){
				var d = distance(list[i],this.position).r;
				if( d< record){
					record = d;
					nearest = i;
				}
			}
			
			if(record<list[nearest].r+this.r){
				//list[nearest] = {x:random(0,innerWidth),y:random(0,innerHeight)};
				initiate.blast(fallout,15,list[nearest].x,list[nearest].y);
				list.splice(nearest,1);
				
				game.score++;
				
				this.hitpoints -= 10;
				//initiate.blast(fallout,15,list[nearest].x,list[nearest].y);
			}else if(nearest>-1){
				this.seek(list[nearest]);
				//return this.seek(list[nearest]);
			}
			
			//return {x:0,y:0};
			
		
		}
		this.behavier = function(G,B){
			var steerG = this.eat(G);
			var steerB = this.eat(B);
			/*
			steerG.x *= this.DNA[0];
			steerG.y *= this.DNA[0];
			steerB.x *= this.DNA[1];
			steerB.y *= this.DNA[1];
			*/
			
			this.applyForce(steerG);
			this.applyForce(steerB);
		
		
		}
		
		
		
		this.render = function(){
			
			
			ctx.save();
			
				
				ctx.beginPath();
				ctx.fillStyle = 'white';
				
				ctx.translate(this.position.x,this.position.y);
				ctx.rotate(this.phase);
				//ctx.arc(this.position.x,this.position.y,this.r,0,Math.PI*2,false);
				ctx.fillRect(-this.w*0.5,-this.h*0.5,this.w,this.h);
				ctx.fill();
				ctx.closePath();

				//head
				
				ctx.beginPath();
                ctx.moveTo(-this.w*0.5,-this.h*0.5);
                ctx.lineTo(0,-this.h*0.5-10);
                ctx.lineTo(this.w*0.5,-this.h*0.5);
                ctx.closePath();
                ctx.fillStyle = 'red';    
                ctx.fill();  
				
				
				//fin left
				ctx.beginPath();
                ctx.moveTo(-this.w*0.5,-4);
                ctx.lineTo(-this.w*0.5-4,4);
                ctx.lineTo(-this.w*0.5,4);
                ctx.closePath();
                ctx.fillStyle = 'white';    
                ctx.fill(); 
				
				ctx.beginPath();
                ctx.moveTo(this.w*0.5,-4);
                ctx.lineTo(this.w*0.5+4,4);
                ctx.lineTo(this.w*0.5,4);
                ctx.closePath();
                ctx.fillStyle = 'white';    
                ctx.fill(); 
				
				
				
				
				/*
				ctx.beginPath();
				ctx.fillRect(this.w * -0.5, this.h * -0.5, this.w, this.h);
				ctx.fillStyle = 'red';
				ctx.fill();
				ctx.closePath();
                  */      
				//this.renderFlame(0,this.h * 0.5);    
                ctx.beginPath();
                ctx.moveTo(-this.w,this.h+3);
                ctx.lineTo(this.w,this.h+3);
                ctx.lineTo(0, this.h+3 + Math.random()*20);
                //ctx.lineTo( -5,10);
                ctx.closePath();
                ctx.fillStyle = 'orange';    
                ctx.fill();   
				
				
			ctx.restore();
		
		}
	
	
	}