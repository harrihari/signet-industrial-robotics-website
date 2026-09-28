const add=(a,b)=>a.map((v,i)=>v+b[i]);
const sub=(a,b)=>a.map((v,i)=>v-b[i]);
const mul=(a,s)=>a.map(v=>v*s);
const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const unit=a=>mul(a,1/(Math.hypot(...a)||1));
const steel=[153,177,188], dark=[55,81,94], orange=[211,92,50];
const ease=t=>t*t*(3-2*t);

// A continuous centerline with tangent quarter bends, rather than joined segments.
const jumperPath=[[-2.55,.88,0],[-2.55,1.30,0]];
for(let i=1;i<=10;i++){const t=i/10*Math.PI/2;jumperPath.push([-2.55,1.30+.25*Math.sin(t),-.25+.25*Math.cos(t)]);}
jumperPath.push([-2.55,1.55,-1.30]);
for(let i=1;i<=10;i++){const t=Math.PI+i/10*Math.PI/2;jumperPath.push([-2.30+.25*Math.cos(t),1.55,-1.30+.25*Math.sin(t)]);}
jumperPath.push([2.30,1.55,-1.55]);
for(let i=1;i<=10;i++){const t=-Math.PI/2+i/10*Math.PI/2;jumperPath.push([2.30+.25*Math.cos(t),1.55,-1.30+.25*Math.sin(t)]);}
jumperPath.push([2.55,1.55,-.25]);
for(let i=1;i<=10;i++){const t=i/10*Math.PI/2;jumperPath.push([2.55,1.30+.25*Math.cos(t),-.25+.25*Math.sin(t)]);}
jumperPath.push([2.55,.88,0]);
let frameNormal=[0,0,1];
const jumperRings=jumperPath.map((point,i)=>{
  const tangent=unit(sub(jumperPath[Math.min(i+1,jumperPath.length-1)],jumperPath[Math.max(0,i-1)]));
  frameNormal=unit(sub(frameNormal,mul(tangent,dot(frameNormal,tangent))));
  const binormal=cross(tangent,frameNormal);
  return Array.from({length:24},(_,j)=>{const a=j/24*Math.PI*2;return add(point,add(mul(frameNormal,.115*Math.cos(a)),mul(binormal,.115*Math.sin(a))));});
});

export function drawFrame(ctx,w,h,{time=0,stage=0}={}){
  ctx.clearRect(0,0,w,h);
  
  const scale=Math.min(w/7.7,h/4.5);
  const yaw=-.43+Math.sin(time*.13)*.022,pitch=.60,cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);
  function project(v){const x=v[0]*cy+v[2]*sy,z=-v[0]*sy+v[2]*cy;return [w*.5+x*scale,h*(stage<2?.61:.67)-(v[1]*cp-z*sp)*scale,v[1]*sp+z*cp]}
  const faces=[];
  function face(vertices,color,edges=true){const n=unit(cross(sub(vertices[1],vertices[0]),sub(vertices[2],vertices[0])));const light=.77+.23*Math.max(0,dot(n,unit([-.35,1,.7])));faces.push({edges,points:vertices.map(project),color:color.map(v=>Math.round(v*light)),depth:vertices.reduce((s,v)=>s+project(v)[2],0)/vertices.length});}
  function box(c,size,color){const [x,y,z]=c,[a,b,d]=size.map(v=>v/2);const p=[[x-a,y-b,z-d],[x+a,y-b,z-d],[x+a,y+b,z-d],[x-a,y+b,z-d],[x-a,y-b,z+d],[x+a,y-b,z+d],[x+a,y+b,z+d],[x-a,y+b,z+d]];[[0,3,2,1],[4,5,6,7],[0,1,5,4],[3,7,6,2],[1,2,6,5],[0,4,7,3]].forEach(f=>face(f.map(i=>p[i]),color));}
  function cylinder(a,b,r,color,n=32){const dir=unit(sub(b,a)),u=unit(cross(dir,Math.abs(dir[1])>.9?[1,0,0]:[0,1,0])),v=cross(dir,u);const points=[];for(let i=0;i<n;i++){const angle=i/n*Math.PI*2,offset=add(mul(u,Math.cos(angle)*r),mul(v,Math.sin(angle)*r));points.push([add(a,offset),add(b,offset)]);}for(let i=0;i<n;i++){const j=(i+1)%n;face([points[i][0],points[j][0],points[j][1],points[i][1]],color,false);}face(points.map(p=>p[0]).reverse(),color,false);face(points.map(p=>p[1]),color,false);}
  function line(points,color='#afc2ca',width=1,dash=[]){ctx.beginPath();points.map(project).forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.strokeStyle=color;ctx.lineWidth=width;ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([]);}
  function circle3(c,r,color){const points=[];for(let i=0;i<50;i++){const a=i/50*Math.PI*2;points.push(add(c,[Math.cos(a)*r,0,Math.sin(a)*r]));}ctx.beginPath();points.map(project).forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fillStyle=color;ctx.fill();}
  // Engineering reference plane, fixed to world geometry.
  for(let x=-4;x<=4;x+=.5)line([[x,0,-2.5],[x,0,2.2]],'#dee8ed',.65);
  for(let z=-2.5;z<=2.2;z+=.5)line([[-4,0,z],[4,0,z]],'#dee8ed',.65);
  const A=[-2.55,.88,0],B=[2.55,.88,0];
  for(const x of [-2.55,2.55]){
    circle3([x,.004,0],.75,'#44627313');
    box([x,.09,0],[1.1,.18,.95],[180,196,204]);
    box([x,.22,0],[.77,.09,.69],dark);
    cylinder([x,.2,0],[x,.76,0],.27,steel);
    cylinder([x,.6,0],[x,.73,0],.42,dark);
    cylinder([x,.74,0],[x,.86,0],.38,[175,193,202]);
    cylinder([x,.86,0],[x,.88,0],.20,dark);
    for(let i=0;i<8;i++){const a=i*Math.PI/4;cylinder([x+Math.cos(a)*.32,.84,Math.sin(a)*.32],[x+Math.cos(a)*.32,.915,Math.sin(a)*.32],.032,[84,106,116],8);}
  }
  const local=((time%12)/12),travel=ease((1-Math.cos(local*Math.PI*2))/2),bx=-2.25+travel*4.5;
  const bottle=[stage===0?bx:0,1.65,-.1];
  if(stage<2){
    line([[-2.55,1.62,0],[2.55,1.62,0]],'#99b5c3',1,[4,5]);
    if(stage===0)line([[-2.55,1.62,0],[bottle[0],1.62,0]],'#d65b36',1.5);
    line([A,[-2.55,1.62,0]],'#a3bac6',1,[3,5]);line([B,[2.55,1.62,0]],'#a3bac6',1,[3,5]);
    cylinder(add(bottle,[-.73,0,0]),add(bottle,[.73,0,0]),.19,[179,195,204]);
    cylinder(add(bottle,[-.77,0,0]),add(bottle,[-.64,0,0]),.23,dark);
    cylinder(add(bottle,[.64,0,0]),add(bottle,[.77,0,0]),.23,dark);
    for(const x of [-.46,.46]){cylinder(add(bottle,[x-.045,0,0]),add(bottle,[x+.045,0,0]),.206,orange);box(add(bottle,[x,-.2,0]),[.13,.09,.42],dark);}
    if(stage===1){const p=project(bottle),cyt=37;ctx.beginPath();ctx.moveTo(p[0],p[1]-23);ctx.lineTo(p[0],cyt+17);ctx.strokeStyle='#a7bdc7';ctx.setLineDash([2,5]);ctx.lineWidth=1;ctx.stroke();ctx.setLineDash([]);const y=p[1]-23-((time%2)/2)*(p[1]-cyt-40);ctx.fillStyle='#d65b36';ctx.beginPath();ctx.arc(p[0],y,2.5,0,Math.PI*2);ctx.fill();}
  }else{
    // A nominal jumper centerline, shown only as illustrative geometry.
    const pipeColor=stage===3?[91,133,148]:[143,166,177];
    for(let i=1;i<jumperRings.length;i++)for(let j=0;j<24;j++){
      const k=(j+1)%24;
      face([jumperRings[i-1][j],jumperRings[i-1][k],jumperRings[i][k],jumperRings[i][j]],pipeColor,false);
    }
    for(const x of [-2.55,2.55])cylinder([x,.9,0],[x,1.03,0],.33,steel);
    // Dimension extension lines and ticks show relationships without fabricated values.
    line([[-2.55,.015,.5],[-2.55,.015,1.52]],'#90a9b4');line([[2.55,.015,.5],[2.55,.015,1.52]],'#90a9b4');
    line([[-2.55,.015,1.32],[2.55,.015,1.32]],'#c55b3d',1.15);
    if(stage===3){const sx=-2.55+((time%5)/5)*5.1;line([[-2.55,.015,1.32],[sx,.015,1.32]],'#d45229',2.2);const sp=project([sx,.015,1.32]);ctx.beginPath();ctx.arc(sp[0],sp[1],3.2,0,Math.PI*2);ctx.fillStyle='#d45229';ctx.fill();}
    for(const x of [-2.55,2.55])line([[x-.1,.015,1.43],[x+.1,.015,1.21]],'#c55b3d',1.2);
    if(stage===2){line([[-2.55,1.55,-1.55],[2.55,1.55,-1.55]],'#7b99a9',1,[3,4]);}
  }
  faces.sort((a,b)=>a.depth-b.depth);
  for(const f of faces){ctx.beginPath();f.points.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fillStyle=`rgb(${f.color.join(',')})`;ctx.fill();ctx.strokeStyle=f.edges?'rgba(37,69,87,.13)':ctx.fillStyle;ctx.lineWidth=f.edges?.35:.6;ctx.stroke();}
  function label(text,x,y,align='center',accent=false){ctx.font=`12px Arial`;ctx.textAlign=align;ctx.textBaseline='middle';const m=ctx.measureText(text),pad=7;ctx.fillStyle='#fafcfce6';ctx.fillRect(x-(align==='center'?m.width/2:align==='right'?m.width:0)-pad,y-10,m.width+pad*2,20);ctx.fillStyle=accent?'#bb502f':'#526f7e';ctx.fillText(text,x,y);}
  function tag(p,text,dx,dy){const v=project(p),y=v[1]+dy;ctx.font='12px Arial';const x=Math.min(w-ctx.measureText(text).width-12,Math.max(14,v[0]+dx));ctx.beginPath();ctx.moveTo(v[0],v[1]);ctx.lineTo(x,y);ctx.strokeStyle='#91a9b5';ctx.lineWidth=.8;ctx.stroke();label(text,x,y,dx<0?'right':'left');}
  const pa=project(A),pb=project(B);label('A',pa[0],pa[1]+54);label('B',pb[0],pb[1]+54);
  if(stage===0){tag(add(bottle,[0,.2,0]),'INERTIAL UNIT',w<420?15:27,-38);label('MEASUREMENT PATH',w*.5,h*.92,'center');}
  if(stage===1){label('REMOTE SPECIALIST',w*.5,30,'center',true);label('FIELD DATA / SPECIALIST REVIEW',w*.5,h*.92,'center');}
  if(stage===2){label('REFERENCE GEOMETRY',w*.5,32,'center',true);label('DIMENSIONAL REFERENCES',w*.5,h*.92,'center');}
  if(stage===3){label('COMPLETED ASSEMBLY',w*.5,32,'center',true);label('DIMENSIONAL VERIFICATION',w*.5,h*.92,'center');}
}
