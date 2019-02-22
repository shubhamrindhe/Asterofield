

		function random(a,b){
            return a + (b-a)*Math.random();
        }
        
        
        function distance(a,b){
            var dx = Math.abs(a.x - b.x);
            var dy = Math.abs(a.y - b.y);
            return {    x : dx , y : dy , r : r(dx,dy,0,0)    };
        }
        function r(x,y,x1,y1){
            return Math.sqrt((x-x1)*(x-x1)+(y-y1)*(y-y1));
        }
		
		function map(n,s1,so1,s2,so2){
			return ( (n-s1)/(so1-s1) )*(so2-s2) + s2;
		}