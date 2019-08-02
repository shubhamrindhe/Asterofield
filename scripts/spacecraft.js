        
    function Spacecraft(x,y){
            this.class = 2;
            this.color = "red";
            this.width = 20;
            this.height = 20;
            this.w = 10;
            this.h = 22;
			this.power = 25;
            this.position = {
                x : x,
                y : y
            };
            this.speed = 5;
            this.velocity = {
                x: undefined,
                y: undefined
            };
            this.torque = 5;
            this.angle = 0;
            this.engineOn = true;
            this.thruster = {
                main : false, 
                left : false,
                right : false,
                flame : 20,
                w : 4,
                h : 11,
            };
			
			this.shield = 100;
			
			this.weapon = 'missile'; 
            
            this.crashed = false;
            this.exploded = false;
            
            this.renderFlame = function(x,y,w,l,color){
                        ctx.beginPath();
                        ctx.moveTo(x,y);
                        ctx.lineTo(x-w * 0.5, y);
                        ctx.lineTo(x, y + Math.random() * l);
                        ctx.lineTo( x+w*0.5, y);
                        ctx.closePath();
                        ctx.fillStyle = color;
                        ctx.fill();
            }
            
            this.draw = function(){
                        switch(this.class){
                        
                            case 1 :
                                    //rect
                                    ctx.beginPath();
                                    ctx.fillRect(this.width * -0.5, this.height * -0.5, this.width, this.height);
                                    ctx.fillStyle = this.color;
                                    ctx.fill();
                                    ctx.closePath();
                                break;
                            
                            case 2 :
                                    ctx.beginPath();
                                    ctx.moveTo(0,this.height*-0.5);
                                    
                                    ctx.lineTo(this.w*-0.5,-this.height/4);
                                    ctx.lineTo(this.w*-0.5,this.height/4);
                                    ctx.lineTo(this.width*-0.5 + this.thruster.w,this.height/4);
                                    ctx.lineTo(this.width*-0.5 + this.thruster.w,this.height/4-this.thruster.h/4);
                                    ctx.lineTo(this.width*-0.5,this.height/4-this.thruster.h/4);
                                    ctx.lineTo(this.width*-0.5,this.height*.5);
                                    ctx.lineTo(this.width*-0.5 + this.thruster.w,this.height*.5);
                                    ctx.lineTo(this.width*-0.5 + this.thruster.w,this.height*.5-this.thruster.h/4);
                                    ctx.lineTo(this.w*-.5,this.height/2-this.thruster.h/4);
                                    ctx.lineTo(this.w*-.5,this.height/2);
                                    
                                    ctx.lineTo(this.w*.5,this.height/2);
                                    ctx.lineTo(this.w*.5,this.height/2-this.thruster.h/4);
                                    ctx.lineTo(this.width*0.5 - this.thruster.w,this.height*.5-this.thruster.h/4);
                                    ctx.lineTo(this.width*0.5 - this.thruster.w,this.height*.5);
                                    ctx.lineTo(this.width*0.5,this.height*.5);
                                    ctx.lineTo(this.width*0.5,this.height/4-this.thruster.h/4);
                                    ctx.lineTo(this.width*0.5 - this.thruster.w,this.height/4-this.thruster.h/4);
                                    ctx.lineTo(this.width*0.5 - this.thruster.w,this.height/4);
                                    ctx.lineTo(this.w*0.5,this.height/4);
                                    ctx.lineTo(this.w*0.5,-this.height/4);
                                    
                                    ctx.fillStyle = this.color;
                                    ctx.fill();
                                    ctx.closePath();
                                break;
                        
                        
                        
                        }    
            }
            
            this.render = function(){
                    ctx.save();
                    //ctx.beginPath();
                    ctx.translate(this.position.x, this.position.y);
                    ctx.rotate(this.angle);
                    
                    this.draw();
					/*
					ctx.beginPath();
					ctx.moveTo(0,0);
					ctx.lineTo(0,-300);
					ctx.lineWidth = 1;
					ctx.strokeStyle = 'white';
					ctx.stroke();
					ctx.closePath();
                    */
                    
                    if(this.engineOn)
                    {
                        this.renderFlame(0,3+this.height * 0.5,this.w,this.thruster.flame,'orange');
                    }
                    if(this.thruster.left)
                    {
                        this.renderFlame(this.width*-.5 + this.thruster.w/2,2 + this.height * 0.5,this.thruster.w,this.thruster.flame,'orange');
                    }
                    if(this.thruster.right)
                    {
                        this.renderFlame(this.width*.5 - this.thruster.w/2,2 + this.height * 0.5,this.thruster.w,this.thruster.flame,'orange');
                    }
					
					if(this.shield!=undefined || this.shield!=null){
						ctx.beginPath();
						var rgrad = ctx.createRadialGradient(0,0,this.shield*0.95,0,0,this.shield);
						rgrad.addColorStop(0.9,'rgba(255,255,255,0)');
						rgrad.addColorStop(1,'rgba(255,255,255,0.3)');
						ctx.fillStyle = rgrad;
						
						ctx.arc(0,0,this.shield,0,Math.PI*2,true);
						
						//ctx.stroke();
						ctx.fill();
						
						ctx.closePath();
						
					}
					
					/*
					ctx.beginPath();
                var rgrad = ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r);
                ctx.moveTo(f.x,f.y);
                rgrad.addColorStop(0,'white');
                rgrad.addColorStop(.8,'rgba(255,255,255,0)');
                ctx.fillStyle = rgrad;
                ctx.arc(f.x,f.y,f.r,0,Math.PI*2,true);
                ctx.fill();
                ctx.closePath();
					*/
					
                    ctx.restore();
            }
            this.update = function(){
					if(this.power<25)
						++this.power;
				
				
                    if(this.thruster.left){
                        this.angle += this.torque*(Math.PI / 180);
                        if( this.angle > Math.PI*2 )
                            this.angle -= Math.PI*2;
                    }
                    else if(this.thruster.right){
                        this.angle -= this.torque*(Math.PI / 180);
                        if( this.angle < 0 )
                            this.angle += Math.PI*2;
                    }
                    if( this.engineOn && this.thruster.main )
                    {
                        this.velocity.x = this.speed*Math.sin(this.angle);
                        this.velocity.y = this.speed*Math.cos(this.angle);
                        
                        this.position.x += this.velocity.x;
                        this.position.y -= this.velocity.y;
                    }
                    
					
					
					for(var i=0;i<astroides.length;++i){
						this.crashDetect(astroides[i]);
						
						if(this.shield!=undefined||this.shield!=null){
							if(distance(this.position,astroides[i]).r < astroides[i].r + this.shield ){
								initiate.blast(fallout,15,astroides[i].x,astroides[i].y);
                            
								astroides.splice(i,1);
								
									this.shield -= 10;
									
							}	
						}
						
					}
					
					if(this.shield < r(this.w,this.h,0,0))
						this.shield = null;
					
					
					
					
                    /*astroides.forEach(function(particle){
                    });
                    */
					
                    
                    switch(game.mode){
                        case 'easy' : 
                            if(this.position.x<0)
                                this.position.x = innerWidth;
                            if(this.position.x>innerWidth)
                                this.position.x = 0;
                            if(this.position.y<0)
                                this.position.y = innerHeight;
                            if(this.position.y>innerHeight)
                                this.position.y = 0;
                            break;
                            
                        case 'hardcore' :
                            if( this.position.x<0 || this.position.x>canvas.width || this.position.y<0 || this.position.y>canvas.height)
                                this.crashed = true;
                            break;
                    
                    
                    
                    }
                    
                    
                    
                    
                    
                    
                    
                    this.render();
            }
			this.crashDetect = function(particle){
				if(distance(this.position,particle).r < particle.r + r(this.width/2,this.height/2,0,0)){
                            this.crashed = true;
                }
			}
			
			this.toggleWeapon = function(){
				if(this.weapon=='missile')
					this.weapon = 'bloodhound';
				else if(this.weapon=='bloodhound')
					this.weapon = 'missile';
				
			}
			
			this.activateShield = function(){
				this.shield = new Particle(this.position.x,this.position.y,this.r*2);
				
			}
			
        }