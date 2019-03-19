    
        
        function Particle(x,y,r){
                
                    this.x = x;
                    this.y = y;
                    this.r = r;
                    this.color = 'rgba(180,180,180,1)';
                    this.velocity={
                        x : random(-2,2), 
                        y : random(2,5)
                    };
                    this.mass = 1;
                    this.gravity = {
                        x : 0,
                        y : 0,
                    };
                    this.a=1;
                    this.radian = Math.random()*Math.PI*2;
                    this.e = 1;
                    
                    
                    
                            
                    this.draw = function(){
                        
                        ctx.beginPath();
                        ctx.strokeStyle = this.color;
                        ctx.fillStyle = this.color;
                        ctx.lineWidth = 2;
                        ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
                        ctx.stroke();
                        ctx.fill();
                        ctx.closePath();            
                        
                    }
                    this.update = function(astroides){
                        
                        
                        for(var i=0;i<astroides.length;++i){
                            if( this === astroides[i] ) continue;
                            if( distance(this,astroides[i]).r - (this.r + astroides[i].r )< 0){
                                    //console.log('yo');
                                    collisionDetect( this , astroides[i] );
                            }
                        }
                        
                        
                        
                        
                        
                        
                        if(  this.x<0 || this.x > canvas.width ||  this.y > canvas.height ){
                            astroides.splice(astroides.indexOf(this),1);
                            //initiate.particles(astroides,1);
                        }
                        //this.velocity.y += this.gravity.y;    //gravity
                        
                        this.x += this.velocity.x;
                        this.y += this.velocity.y;
                        
                        
                                
                    }
                    this.explode = function(){
                        ctx.beginPath();
                        ctx.strokeStyle = this.color;
                        ctx.fillStyle = this.color;
                        ctx.lineWidth = 2;
                        ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
                        ctx.stroke();
                        ctx.fill();
                        ctx.closePath();
                        
                        this.r -= 0.5;
                        if(  this.r<0){
                            fallout.splice(fallout.indexOf(this),1);
                        }
                        //this.velocity.y += this.gravity.y;    //gravity
                        
                        this.x += this.velocity.x;
                        this.y += this.velocity.y;
                    
                    }
                    
        }