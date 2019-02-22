

function Missile(x,y,angle) {
            this.phase =  angle;
            this.x = x;
            this.y = y; 
            this.w = 2;
            this.h = 8;
            this.velocity = {
                x : 5*Math.sin(this.phase),
                y : 5*Math.cos(this.phase),
            };
            this.color = 'red';
            this.flameColor = 'orange';
            
            this.render = function(){
                    ctx.save();
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.phase);
                    
                        ctx.beginPath();
                        ctx.fillRect(this.w * -0.5, this.h * -0.5, this.w, this.h);
                        ctx.fillStyle = 'red';
                        ctx.fill();
                        ctx.closePath();
                        
                        //this.renderFlame(0,this.h * 0.5);    
                        ctx.beginPath();
                        ctx.moveTo(0,this.h*.5);
                        ctx.lineTo(-this.w * 0.5, this.h*.5);
                        ctx.lineTo(0, this.h*.5 + Math.random()*20);
                        ctx.lineTo( 0+this.w*0.5, this.h*.5);
                        ctx.closePath();
                        ctx.fillStyle = this.flameColor;    
                        ctx.fill();    
                    
                    ctx.restore();
                    
                    this.x += this.velocity.x;
                    this.y -= this.velocity.y;
                    
                    if( this.x<0 || this.x>canvas.width || this.y<0 || this.y> canvas.height ){
                        missiles.splice(missiles.indexOf(this),1);
                    }
                    
					
                    for(var i=0;i<astroides.length;++i){
                        if(distance(astroides[i],this).r <= astroides[i].r + r(this.w/2,this.h/2,0,0) ){
                            game.score++;
                            missiles.splice(missiles.indexOf(this),1);
                            
                            var astro = astroides[i];
                            initiate.blast(fallout,15,astroides[i].x,astroides[i].y);
                            
                            astroides.splice(i,1);
                            //astroides.push(astro.x,astro.y,astro.r/2);
                            //initiate.particles(astroides,1);    //infinite
                            
                            //alert();
                        }
                    }
					
                    
            }
            
        };
        