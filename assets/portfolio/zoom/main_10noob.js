
var scene, light, camera;
var ready = false, isMobile = false;

var imageFile="/assets/portfolio/zoom/dinosaur_1.png";
//TODO: dinosaur_1, dinosaur_2, dinosaur_3
	 
var shelfW=2140*1.5, shelfH=2236*1.5;
var shelfWpc=shelfW/shelfH;
var glassH=300, glassW=300;

var fpsLabel = document.getElementById("fpsLabel");
var canvas = document.getElementById("canvas"); 
var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
		
_init();  
   
function _init(){
	if (typeof(window.orientation) != "undefined") isMobile = true;
	
	if (!webgl_detect())  
	{   
		document.getElementById("webGLwarning").style.display = "block";
		return;
	}
	
	document.getElementById("loadingScene").style.display = "block";
	
	if (BABYLON.Engine.isSupported())
	{    
		scene = new BABYLON.Scene(engine);  
		scene.clearColor = new BABYLON.Color4(1, 1, 1, 0); 
					
		light = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
		light.diffuse = new BABYLON.Color3(0.5, 0.5, 0.5);
		light.specular = new BABYLON.Color3(0, 0, 0); 
		light.groundColor = new BABYLON.Color3(1, 1, 1);

		camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", -Math.PI/2, Math.PI/2, 30, BABYLON.Vector3.Zero(), scene);
		camera.lowerBetaLimit = camera.upperBetaLimit = Math.PI/2; 
		camera.lowerAlphaLimit = camera.alpha +(-50 * (Math.PI/180));
		camera.upperAlphaLimit = camera.alpha +(50 * (Math.PI/180));
		camera.lowerRadiusLimit = 10;
		camera.upperRadiusLimit = 650;  
		camera.attachControl(canvas, true);
		scene.activeCamera = camera;   
       
		var shelf = new BABYLON.Mesh.CreatePlane("shelf", 10, scene);
		shelf.scaling.x = shelfWpc;
		shelf.material = new BABYLON.StandardMaterial("Mat", scene);
		shelf.material.diffuseTexture = new BABYLON.Texture(imageFile, scene);
		shelf.material.emissiveColor = new BABYLON.Color3(1, 1, 1); 
		shelf.material.diffuseTexture.hasAlpha = true;
		shelf.position = new BABYLON.Vector3(0, -5, 0);

		engine.runRenderLoop(function () {
			fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
			if(scene.isReady()) {
				if(!ready){
					document.getElementById("loadingScene").style.display = "none"; 
					ready = !ready; 
				}
				scene.render();
			}
		});
		
	}
}
   
//WEBGL DETECT
function webgl_detect() {
    if (!!window.WebGLRenderingContext) 
	{
        var names = ["webgl2", "experimental-webgl2", "webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
        var context = null;

        for(var i=0;i<names.length;i++) 
		{
			context = canvas.getContext(names[i]);
			if (context && typeof context.getParameter == "function") 
				// WebGL is enabled
				return true;   
        }
 
        // WebGL is supported, but disabled
        return false;
    } 

    // WebGL not supported
    return false;
}   

window.addEventListener("resize", function() { engine.resize();});
window.addEventListener( "contextmenu", function(e) {e.preventDefault();}, false);  
window.addEventListener("mousemove", mousemove, false);

function mousemove(e){
	var pickResult = scene.pick(scene.pointerX, scene.pointerY);
	if (pickResult.hit) {
		var w=shelfWpc*10;
		var h = (pickResult.pickedPoint.x).toFixed(4);
		var v = (pickResult.pickedPoint.y).toFixed(4);
		
		var y=v*-1;
		percenty=(y/10).toFixed(4);
		var x=Number(((w/2))+(1*h)).toFixed(4);
		percentx=(x/w).toFixed(4);
		
		if(pickResult.pickedMesh.name=="shelf"){
			$("#glass").show();
			overshelf(e,percentx,percenty);
		}else{
			$("#glass").hide();
		}
	}else{
		$("#glass").hide();
	}
}

$(document).ready(function(){	
	$("#Img").attr({'src':imageFile}).css({'height':shelfH, 'width':shelfW});
});

function overshelf(e,px,py){
	$('#glass').css({
		height:glassH,
		width: glassW,
		left:  e.pageX-glassW/2,
		top:   e.pageY-glassH/2
	});
	
	var shelfX = (px * shelfW) * -1;
	var shelfY = (( py) * shelfH) * -1;
	
	$('#Img').css({
	   'margin-left':  shelfX+glassW/2,
	   'margin-top':   shelfY+glassH/2
	});	
}
