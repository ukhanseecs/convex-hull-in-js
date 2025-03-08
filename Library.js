const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height=window.innerHeight;




function make_checkerboard()
{
    const rows = 30;
    const cols = 50;
    const tileSize = canvas.width / cols;
    const colors = ["#D7263D", "#F46036", "#2E294E", "#1B998B","#C5D86D"];
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let colorIndex = (row + col) % colors.length; // Cycle through colors
            ctx.fillStyle = colors[colorIndex];
            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }
    
}


//===========================vec2d class and helper functions ========================================================
 class Vec2d{

    constructor(a,b,c=0){
        this.x=a;
        this.y=b;
        this.z=c;
    }

}

 function vec_add(a,b){ return new Vec2d(a.x+b.x , a.y+b.y); }
 function vec_sub(a,b){ return new Vec2d(a.x-b.x , a.y-b.y); }
 function vec_dotproduct(a,b){ return (a.x*b.x + a.y*b.y); }
//function vec_crossproduct(a,b){} //get this right this time!!
 function vec_mag(a){ return Math.sqrt((a.x*a.x)+(a.y*a.y)+(a.z*a.z));}
 function vec_multiply(a,b){
    let c = new Vec2d(0,0);
    c.x=a.x*b;
    c.y=a.y*b;
    c.z=a.z*b;
    return c;
}
 function vec_normalise(a){
    let c = new Vec2d(0,0);
    let b=vec_mag(a);
    c.x=a.x/b;
    c.y=a.y/b;
    c.z=a.z/b;
    
    return c;
}
 function Line_Intersection( p1,  pdir,  v1,  vdir){ 

     p2 = vec_add(pdir , p1);
     v2 = vec_add(vdir , v1);
    
    const x1=p1.x; const y1=p1.y;
    const x2=p2.x; const y2=p2.y;
    const x3=v1.x; const y3=v1.y;
    const x4=v2.x; const y4=v2.y;
    
    let Px=0;
    let Py=0;
    
    if( ((x1-x2)*(y3-y4)  -  (y1-y2)*(x3-x4) ) != 0)
    {
     Px = (  (x1*y2 - y1*x2)*(x3-x4) - (x1-x2)*(x3*y4 - y3*x4)  ) / ((x1-x2)*(y3-y4)  -  (y1-y2)*(x3-x4) );
     Py = (  (x1*y2 - y1*x2)*(y3-y4) - (y1-y2)*(x3*y4 - y3*x4)  ) / ((x1-x2)*(y3-y4)  -  (y1-y2)*(x3-x4) );
    
    let intersection = new Vec2d(Px,Py);
    
    return intersection;
    }

    return null;
}
 function pointChecker_Line( point,  v1 , dir){

    let tempX = dir.x;
    let tempY = dir.y;

    dir = new Vec2d(tempY,-1*tempX);

    if(vec_dotproduct(v1,dir) > vec_dotproduct(point,dir)){return false;}

    else{return true;}

}
 function normal_dir(p1,p2){
    let c = new Vec2d(1*(p2.y-p1.y) , -1*(p2.x-p1.x));  c = vec_normalise(c);
    return c;
}
//============================Drawing Functions==========================================================
 function DrawLine(vertexA,vertexB,lineCol='red',lw=5,fillcol='black'){
    ctx.fillStyle=fillcol;
    ctx.strokeStyle=lineCol;
    ctx.lineWidth=lw;
    ctx.beginPath();
    ctx.moveTo(vertexA.x,vertexA.y);
    ctx.lineTo(vertexB.x,vertexB.y);
    ctx.stroke();
}
//courtesy of chatGPT :)
function DrawLineColored(vertexA, vertexB, segmentLength = 4) {
    const ctx = canvas.getContext("2d");
    const colors = ["cyan", "purple", "yellow", "#ff00a2"]; // Color pattern

    // Calculate total distance between points
    let totalLength = vec_mag(vec_sub(vertexB,vertexA));
    
    // Compute number of full segments based on given segment length
    let segmentCount = Math.ceil(totalLength / segmentLength);

    // Compute step size for x and y
    let dx = (vertexB.x - vertexA.x) / segmentCount;
    let dy = (vertexB.y - vertexA.y) / segmentCount;

    for (let i = 0; i < segmentCount; i++) {
        let startX = vertexA.x + i * dx;
        let startY = vertexA.y + i * dy;
        let endX = vertexA.x + (i + 1) * dx;
        let endY = vertexA.y + (i + 1) * dy;

        ctx.strokeStyle = colors[i % colors.length]; // Cycle through colors
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
}

 function DrawTriangle(vertexA,vertexB,vertexC,lineCol='red',lw=5,fillcol='black'){

    DrawLine(vertexA,vertexB,lineCol,lw,fillcol);
    DrawLine(vertexB,vertexC,lineCol,lw,fillcol);
    DrawLine(vertexC,vertexA,lineCol,lw,fillcol);



}
 function DrawCircle(vertex,r,lineCol='red',lw=5,fillcol='black'){
    ctx.fillStyle=fillcol;
    ctx.strokeStyle=lineCol;
    ctx.lineWidth=lw;
    ctx.beginPath();
    ctx.arc(vertex.x,vertex.y,r,0,2*Math.PI);
    ctx.stroke();

}
//GPT :)
function FillCircle(vertex, r, fillCol = 'black') {
    ctx.fillStyle = fillCol;
    ctx.beginPath();
    ctx.arc(vertex.x, vertex.y, r, 0, 2 * Math.PI);
    ctx.fill();
}
//GPT :)
function FillQuarteredCircle(vertex, r, colors = ["cyan", "purple", "yellow", "#ff00a2"]) {
    const ctx = canvas.getContext("2d");

    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(vertex.x, vertex.y);
        ctx.arc(vertex.x, vertex.y, r, (i * Math.PI) / 2, ((i + 1) * Math.PI) / 2);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length]; // Cycle through provided colors
        ctx.fill();
    }
}
 function DrawPolygon(vertexBuffer,indexBuffer,lineCol='red',lw=5,fillcol='black'){

   
    for (let i=0 ; i<indexBuffer.length;i+=3)
    {
        DrawTriangle(vertexBuffer[indexBuffer[i]] , vertexBuffer[indexBuffer[i+1]],vertexBuffer[indexBuffer[i+2]],lineCol,lw,fillcol );
    }
}
 function DrawPolygon2(position,angle,vertexBuffer,indexBuffer,lineCol='red',lw=5,fillcol='black'){

    let transformedVertices=[];
    for(let i=0;i<vertexBuffer.length;i++)
    {
         transformedVertices.push (new Vec2d( (vertexBuffer[i].x * Math.cos(angle) - vertexBuffer[i].y * Math.sin(angle) ) + position.x , (vertexBuffer[i].x * Math.sin(angle) + vertexBuffer[i].y * Math.cos(angle) ) + position.y ) );
        
    }

    for (let i=0 ; i<indexBuffer.length;i+=3)
    {
        DrawTriangle(transformedVertices[indexBuffer[i]] , transformedVertices[indexBuffer[i+1]],transformedVertices[indexBuffer[i+2]],lineCol,lw,fillcol );
    }
}

function DrawPolygon3(vertices ,lineCol='red',lw=5,fillcol='black' ){

    for(let i =0 ; i < vertices.length;i++){
        DrawLine(vertices[i],vertices[(i+1)%vertices.length],lineCol,lw,fillcol);
    }

}


function FindCentroid(vertices){
    let xc=0; let yc=0;
    for(let i=0;i<vertices.length;i++){
        xc += vertices[i].x;
        yc += vertices[i].y;
    }
    xc = xc/vertices.length;    
    yc = yc/vertices.length;
    return new Vec2d(xc,yc);
}

function FillCentroid(vertices){
    let xc=0; let yc=0;
    for(let i=0;i<vertices.length;i++){
        xc += vertices[i].x;
        yc += vertices[i].y;
    }
    xc = xc/vertices.length;    
    yc = yc/vertices.length;
    if (vertices.length > 1){
        FillCircle(new Vec2d(xc,yc),5,'blue');
    }

}



//==================================================================================

//=======================Transform class===================================================================

 class Transform{
    constructor(pos,theta){
        this.position=pos;
        this.angle=theta;        
    }
}
//==================================================================================


//=======================Collider class====================================================================
 class Collider{

    constructor(trans,vb,ib,s=1,t=0,m=5){
        this.transform=trans;
        this.vertexBuffer=vb;
        this.indexBuffer=ib;
        this.transformedVertices=[];
        this.status=s;
        this.mass=m;
        this.inverse_mass = 1/m;
        this.velocity= new Vec2d(0,0);
        this.force = new Vec2d(0,0);

        this.inertia=1;
        this.inverse_inertia=1;
        this.angularVelocity=0;
        this.moment=0;

        this.inCollision = false;
        this.color = "#1bde09";
        this.type=t;
        this.prev_dir=1;
    }

    updateToWorldSpace(){
        this.transformedVertices =[];
        for(let i=0;i<this.vertexBuffer.length;i++)
        {
             this.transformedVertices.push (new Vec2d( (this.vertexBuffer[i].x * Math.cos(this.transform.angle) - this.vertexBuffer[i].y * Math.sin(this.transform.angle) ) + this.transform.position.x , (this.vertexBuffer[i].x * Math.sin(this.transform.angle) + this.vertexBuffer[i].y * Math.cos(this.transform.angle) ) + this.transform.position.y ) );
            
        }
    }
}
 function Step(collidersArray , dt){

    collidersArray.forEach(collider => {

        if(collider.status==1){
        //step the collider
        let gravity = new Vec2d(0,40.8);

        collider.force = vec_add(collider.force,vec_multiply(gravity , collider.mass));
        collider.velocity = vec_add(collider.velocity, vec_multiply(collider.force , (dt/collider.mass)));

        collider.moment=0;
        collider.angularVelocity += (collider.moment/collider.inertia)*dt;


        collider.transform.position =  vec_add(collider.transform.position, vec_multiply(collider.velocity,dt));
        collider.transform.angle += collider.angularVelocity*dt;

        collider.force = new Vec2d(0,0);
        collider.moment=0;

        collider.velocity = vec_multiply(collider.velocity,0.99);
        collider.angularVelocity *= 0.9;
        }
        collider.inCollision =false;
        collider.updateToWorldSpace();
         
     });
}


function Step_without_accum(collidersArray , dt){

    collidersArray.forEach(collider => {

        if(collider.status==1){
        //step the collider
       
        if(collider.velocity.y < 0){collider.velocity.y += 4;}
        else if(collider.velocity.y > 0 && collider.velocity.y < 300 ){collider.velocity.y +=  3;}
        else{collider.velocity.y = 300;}



        if(collider.angularVelocity > 0){collider.angularVelocity -= 0.1;}   
        else{collider.angularVelocity = 0;}
    

        collider.transform.position =  vec_add(collider.transform.position, vec_multiply(collider.velocity,dt));
        collider.transform.angle += collider.angularVelocity*dt;

        }
        collider.inCollision =false;
        collider.updateToWorldSpace();
         
     });
}

 function Solve_SAT( a, b, object){

     let selected_collider =a;
     let other_collider =b;

    let overlap = Number. MAX_VALUE;
    let contact = new Vec2d(0,0);
   
   for(let shape=0; shape<2;shape++){
   
   
       if(shape == 1){
           selected_collider = b;
           other_collider = a;
       }
   
   
   
    for(let i=0;i<(selected_collider.transformedVertices.length);i++){
   
       let j = (i+1)%(selected_collider.transformedVertices.length);
   
       let temp = vec_sub(selected_collider.transformedVertices[j] , selected_collider.transformedVertices[i]);
       let axisProj=new Vec2d(temp.y,-temp.x);
       axisProj=vec_normalise(axisProj); //this was important!!!!!
   
       //crush to 1D and find out the minima and maxima
   
   
       //dot products of selected shape points
       let minimum = Number. MAX_VALUE; let maximum = -Number. MAX_VALUE;
       for(let k=0;k<(selected_collider.transformedVertices.length);k++){
   
           let q =vec_dotproduct(selected_collider.transformedVertices[k],axisProj);
   
           minimum = Math.min(minimum,q);
           maximum = Math.max(maximum,q);
   
   
       }
   
   
           //dot products of other shape points
       let minimum2 = Number. MAX_VALUE; let maximum2 = -Number. MAX_VALUE;
       for(let l=0;l<(other_collider.transformedVertices.length);l++){
   
           let q =vec_dotproduct(other_collider.transformedVertices[l],axisProj);
   
           minimum2 = Math.min(minimum2,q);
           maximum2 = Math.max(maximum2,q);
   
       }
   
        //calculate actual overlap along projection
   
           let new_interval = Math.min(maximum,maximum2) - Math.max(minimum,minimum2);
   
           if(overlap > new_interval)
           {
               overlap =new_interval;
               contact = axisProj;
           }
           //overlap = min(new_interval, overlap);
   
   
       if(!(maximum2 >= minimum && maximum >= minimum2)){return false;}
   
   
    }
   
   }
   
   object.depth = overlap;
   let BA = a.position - b.position;
   if(vec_dotproduct(BA,contact) < 0){contact = contact * -1;}
   object.contact_normal = contact;
   
   return true;
   
}
 function Polygon_Clipping( ref_box , target){

    let new_polygon =[];

   //create another polygon vector container
    let another_polygon=[];

 for(let i=0;i<(target.transformedVertices.length);i++){ new_polygon.push(target.transformedVertices[i]); }

 for(let i=0;i<(ref_box.transformedVertices.length);i++)
 {

     // for every clipping plane
     let p = ref_box.transformedVertices[i];       let q = ref_box.transformedVertices[(i+1)%(ref_box.transformedVertices.length)];
     let dir = vec_sub(p,q);                                 dir = vec_normalise(dir);
     //change dir if function not working
        //had to reverse the direction of subtraction from q-p to p-q


     for(let j=0;j<new_polygon.length;j++)
     {
         //for every line in new polygon
         let r = new_polygon[j];
         let s = new_polygon[(j+1)%new_polygon.length];
         let line =vec_sub(r,s);  //swapping the direction of r and s doesnt matter?
         line = vec_normalise(line);


          //check if points are in or out
         let bpoint1 = pointChecker_Line(r,p,dir);
         let bpoint2 = pointChecker_Line(s,p,dir);


         //Push back vertices using SutherLand - Hodgeman rules

         if(bpoint1==false && bpoint2==false){/** do nothing **/}

         else if(bpoint1==true && bpoint2==true){ another_polygon.push(s);}

         else if(bpoint1==true && bpoint2==false)
         {
             let q2 = Line_Intersection(p,dir,r,line);
             another_polygon.push(q2);
         }

         else if(bpoint1==false && bpoint2==true)
         {
             let q2 = Line_Intersection(p,dir,r,line);
             another_polygon.push(q2);
             another_polygon.push(s);
         }


     }

     new_polygon = another_polygon;
     another_polygon=[];

 }


return new_polygon;


}


 const collisionInfo_struct = {

    bodyA : null,
    bodyB : null,
    bAreColliding : null,
    depth:0,
    contact_normal:new Vec2d(0,0),
    contact_points:[],


    create: function(a,b){

        const newObject =Object.create(this);
        let func_obj={depth:0,contact_normal:null}

        this.bodyA =a;
        this.bodyB =b;
        this.bAreColliding = Solve_SAT(this.bodyA,this.bodyB,func_obj);
        this.contact_normal = func_obj.contact_normal;
        this.depth = func_obj.depth;

        return newObject;
        
    }
};

 function ResolveCollision(h)
{

    h.bodyA.inCollision=true;
    h.bodyB.inCollision=true;


    //resolve interpenetration

    if(h.bodyA.status == 0){h.bodyB.transform.position = vec_sub( h.bodyB.transform.position  ,  vec_multiply(h.contact_normal,h.depth) );}
    else if(h.bodyB.status == 0){h.bodyA.transform.position = vec_sub( h.bodyA.transform.position  ,  vec_multiply(h.contact_normal,h.depth) );}
    else{
        const m_total = h.bodyA.mass + h.bodyB.mass;
        h.bodyA.transform.position = vec_add( h.bodyA.transform.position  ,  vec_multiply(h.contact_normal , (h.bodyB.mass/m_total)*h.depth) );
        h.bodyB.transform.position = vec_sub( h.bodyB.transform.position  ,  vec_multiply(h.contact_normal , (h.bodyA.mass/m_total)*h.depth) );
    }


    //get contact points
    h.contact_points = Polygon_Clipping(h.bodyA , h.bodyB);

    //draw contact points for debugging
    h.contact_points.forEach((cp)=>{
        DrawCircle(cp, 3,'purple');
    })
    
    if(h.contact_points.length >0)
    {
    //for every contact point apply impulses
    
        let cp = h.contact_points[0];
    //flipped the subtraction
    const Ra =  vec_sub( h.bodyA.transform.position, cp);
    const Rb =  vec_sub ( h.bodyB.transform.position,cp);


    const Ra_perp = new Vec2d(Ra.y,-Ra.x);
    const Rb_perp = new Vec2d(Rb.y,-Rb.x);


    const V_AP = vec_add( h.bodyA.velocity , vec_multiply(Ra_perp,h.bodyA.angularVelocity) );
    const V_BP = vec_add( h.bodyB.velocity , vec_multiply(Rb_perp,h.bodyB.angularVelocity) );
    const V_AB = vec_sub(V_BP,V_AP);    //flipped the subtraction


    const lhs =  vec_dotproduct( vec_multiply( V_AB , -(1+1) ) ,  h.contact_normal);
    
    const rhs = vec_dotproduct(h.contact_normal, vec_multiply(h.contact_normal , h.bodyA.inverse_mass + h.bodyB.inverse_mass)) 
                + ( vec_dotproduct(Ra_perp,h.contact_normal) 
                * vec_dotproduct(Ra_perp,h.contact_normal)) 
                *h.bodyA.inverse_inertia 
                +(vec_dotproduct(Rb_perp,h.contact_normal) * vec_dotproduct(Rb_perp,h.contact_normal))
                *h.bodyB.inverse_inertia;


    if(rhs !=0){

        let j =lhs/rhs;


        h.bodyA.velocity =   vec_add (h.bodyA.velocity , vec_multiply ( h.contact_normal,(10000*h.bodyA.inverse_mass) ) );
        // h.bodyA.angularVelocity += vec_dotproduct(Ra_perp, vec_multiply (h.contact_normal,j)) * h.bodyA.inverse_inertia;



        h.bodyB.velocity =  vec_add( h.bodyB.velocity , vec_multiply ( h.contact_normal , (-10000*h.bodyB.inverse_mass) ) );
        // h.bodyB.angularVelocity += vec_dotproduct(Rb_perp, vec_multiply(h.contact_normal,-j) ) * h.bodyB.inverse_inertia;


    }




    
 }

 




}



//==============Collider group class==========================
class ColliderGroup{

constructor(colgroup){

    this.group = colgroup;

}




}


//==============================Loop=====================================================







