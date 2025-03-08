let msPrev = window.performance.now();
const fps = 60;
const msPerFrame = 1000 / fps;

let arr = []; //push points here

document.addEventListener("click", function(e){

    let x = e.clientX;
    let y = e.clientY;
    
    let point = new Vec2d(x,y)
    arr.push(point)
})


let show = false

document.addEventListener("keydown", function(e){
    if(e.key == "Enter"){
        show = !show
    }
})


function Loop(){

    animationID = requestAnimationFrame(Loop);
    
         //=======handle timing===================//
        let msNow = window.performance.now();
        let dt = msNow - msPrev;
    
        if(dt < msPerFrame) return
        let excessTime = dt % msPerFrame
        msPrev = msNow - excessTime
        msPrev = msNow;
        dt=dt/1000;
       
       //==========================================//
        
       
        //clear screen
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillRect(0,0,canvas.width ,canvas.height);
            //make_checkerboard();
    

        //====================================================================================================
        

  
        
        for (let i = 0; i < arr.length; i++){
            // DrawCircle(arr[i], 5, "red")
            FillCircle(arr[i], 5, "red")
        }



        ///=======================================================================================
        // find lowest y point
        function find_pivot(arr){
            let pivot = arr[0]
            for (let i = 1; i < arr.length; i++){
                if (arr[i].y < pivot.y){
                    pivot = arr[i]
                }
                else if (arr[i].y == pivot.y){
                    if (arr[i].x < pivot.x){
                        pivot = arr[i]
                    }
                }
            }
            return pivot
        }
        pivot = find_pivot(arr)

        //====================================================================================================
        // find angles for each point with pivot 
        // store in a map [angle, point]
        // sort the 

        let map_angles = new Map()
        for (let i = 0; i < arr.length; i++){
            if (arr[i] != pivot){
                let angle = Math.atan2(arr[i].y - pivot.y, arr[i].x - pivot.x)
                map_angles.set(angle, arr[i])
            }
        }


        //====================================================================================================
        // check if orientation of point with 2 points/ line is clockwise or counterclockwise

        function check_orientation(p1, p2, p3){
            // Calculate the cross product for orientation
            let val = (p2.y - p1.y) * (p3.x - p2.x) - 
                      (p2.x - p1.x) * (p3.y - p2.y);
            
            if (val === 0) {
                return 0;  // Collinear points
            }
            
            return (val > 0) ? 1 : 2;  // 1 for clockwise, 2 for counterclockwise
        }

        //====================================================================================================
        // find convex hull
        let sorted_angles = Array.from(map_angles.keys()).sort((a,b) => a - b) 
        let hull = []
        hull.push(pivot)
        hull.push(map_angles.get(sorted_angles[0]))
        hull.push(map_angles.get(sorted_angles[1]))

        for (let i = 2; i < sorted_angles.length; i++){
            let top = hull[hull.length - 1] 
            let next_to_top = hull[hull.length - 2]  
            let current = map_angles.get(sorted_angles[i]) // current point
            while (check_orientation(next_to_top, top, current) != 2){ // if not counterclockwise
                hull.pop()
                top = hull[hull.length - 1]
                next_to_top = hull[hull.length - 2]
            }
            hull.push(current) // if counterclockwise
        }

        
    
        if (show){
            for (let i = 0; i < hull.length; i++){
                DrawLine(hull[i], hull[(i+1) % hull.length], "black")
            }
        }
    
    }

    //=======================================================================================     
    
    
    Loop();
