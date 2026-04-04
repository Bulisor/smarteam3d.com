
var scene, light, camera, cameravr, noRender = true, sound, camerado;
var isMobile = false, Sfullscreen = false, Svr = false;
var Ssound = false, Smenu = false, Sinfo = false, Sabout = false;

var fpsLabel = document.getElementById("fpsLabel");
var canvas = document.getElementById("canvas"); 
var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
		
_init();  
   
function _init(){
	if (!webgl_detect() || !BABYLON.Engine.isSupported())  
	{   
		document.getElementById("error").style.display = "block";
		$("#error>.follow").animate({bottom: '0px'}, "slow");
		return;
	}else{
		document.getElementById("loader").style.display = "block";
		$("#loader>.follow").animate({bottom: '0px'}, "slow", ()=>{create_scene();});
	} 
}  

function menu(){
	//true change color when is close
	arrows(".footer_click", ".bottom_banner");
	arrows(".header_click", ".top_banner");
	
	showDivInfo("about", Sabout);
	showDivInfo("info", Sinfo); 
	
	$("#vr").click(function(){
		Svr = true;
		engine.switchFullscreen(true); 
	});
	$("#fullscreen").click(function(){
		//true - no pointer, false - pointer
		engine.switchFullscreen(true);
	});
	$("#tablet").click(function(){
		Sdo = !Sdo;
		if(camerado){
			if(Sdo){
				camera.detachControl(canvas);
				scene.activeCamera = camerado;  
			}else{ 
				camera.attachControl(canvas, true);
				scene.activeCamera = camera; 
			}
		}
	});
	$("#sound").click(function(){
		//mute sound if exist
	});
	$("#menu").click(function(){
		//animate from left top
	});
	
	if(!isMobile){
		$("#tablet").css("color","#7a7a7a").css("cursor","auto");
	}
	if(!sound){
		$("#sound").css("color","#7a7a7a").css("cursor","auto");
	}
	if(!cameravr){
		$("#vr").css("opacity","0.5").css("cursor","auto");
	}
}

function showDivInfo(str){
	$("#"+str).click(function(){
		Sinfo = !Sinfo;
		if(Sinfo) 
			$("."+str).animate({bottom: '0px'}, "slow").show();
		else
			$("."+str).animate({bottom: -$("."+str)[0].offsetHeight+'px'}, "slow",()=>{$("."+str).hide();});
	});
	$("."+str).click(function(){$("."+str).animate({bottom: -$("."+str)[0].offsetHeight+'px'}, "slow",()=>{$("."+str).hide();});});
}

function arrows(str1, str2, changeColor = false){
	$(str1).click(function(){ 
		if($(str1+" i").hasClass("fa-chevron-circle-right")){
		$(str2).animate({right: -screen.width+"px"}, "slow", ()=>{
				$(str1+" i").addClass("fa-chevron-circle-left");
				$(str1+" i").removeClass("fa-chevron-circle-right");
				$(str2).hide();
				if(changeColor) $(str1).css("color","black"); 				
			});
		}else{
			$(str2).animate({right: '0px'}, "slow", ()=>{
				$(str1+" i").addClass("fa-chevron-circle-right");
				$(str1+" i").removeClass("fa-chevron-circle-left");
				if(changeColor) $(str1).css("color","white");
			}).show();	
		}
	});
}

var screen_change_events = "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange";
$(document).on(screen_change_events, function () {
	if(Sfullscreen) {
		Sfullscreen = !Sfullscreen;
		return;
	}
		
	if(Svr){
		camera.detachControl(canvas); 
		cameravr.position = camera.position.clone();
		scene.activeCamera = cameravr;
		Svr = !Svr;
	}else{
		if(scene.activeCamera!=camera){
			camera.attachControl(canvas, true);
			scene.activeCamera = camera; 
		} 
	}
});

function create_scene(){
	//return;
	if (typeof(window.orientation) != "undefined") isMobile = true;

	BABYLON.SceneLoader.ShowLoadingScreen = false; 
	BABYLON.Database.IDBStorageEnabled  = false;
	
	scene = new BABYLON.Scene(engine);   
	scene.clearColor = new BABYLON.Color4(1, 1, 1, 0); 
	
	if (navigator.getVRDisplays)
		cameravr = new BABYLON.WebVRFreeCamera("WebVRCamera", new BABYLON.Vector3(0, 1, 0), scene, false, { trackPosition: false });
	else{
		cameravr = new BABYLON.VRDeviceOrientationArcRotateCamera("vrCam", -Math.PI/2, Math.PI/2, 40, BABYLON.Vector3.Zero(), scene);
		cameravr.lowerRadiusLimit = 10;
		cameravr.upperRadiusLimit = 100; 
		cameravr.panningSensibility = 0; 
	}
		
	cameravr.attachControl(canvas, false);
		
	//light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
	//light.groundColor = BABYLON.Color3.White();
	//light.specular = BABYLON.Color3.Black();
	 
	camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", -Math.PI/2, Math.PI/2, 40, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas,false); 
	//camera.lowerRadiusLimit = 10;
	//camera.upperRadiusLimit = 100; 
	camera.panningSensibility = 0; 	
	scene.activeCamera = camera;    
	
	engine.runRenderLoop(function () {
		fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
		if(noRender && scene.isReady()) {
			document.getElementById("loader").style.display = "none";
			document.getElementById("content").style.display = "block";
			noRender = false;  
		}
		if(scene.isReady() && !noRender) scene.render();
	});  
	
	
	BABYLON.SceneLoader.ImportMesh("", "/assets/portfolio/t_shirt/", "tshirt.babylon", scene, function (meshes) {
	//BABYLON.SceneLoader.ImportMesh("", "/assets/portfolio/t_shirt/", "tshirt.gltf", scene, function (meshes) {
		console.log(meshes)
		meshes[0].setEnabled(false)
		
		var box = BABYLON.Mesh.CreateBox("box", 6.0, scene);
		//var groundMaterial = new BABYLON.StandardMaterial("texture1", scene);
		//groundMaterial.diffuseTexture = new BABYLON.Texture("/assets/portfolio/t_shirt/rgb.png", scene);
		
		var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "/assets/portfolio/t_shirt/HeightMap.jpg", 100, 100, 100, 0, 10, scene, false);
		ground.position.y = -3;
		ground.receiveShadows = true;
	
		var groundMaterial = new BABYLON.CustomMaterial("custom", scene);
		groundMaterial.mixTexture = new BABYLON.Texture("/assets/portfolio/t_shirt/rgb.png", scene);
		groundMaterial.backFaceCulling = false;
		//groundMaterial.mixTexture = new BABYLON.Texture("/assets/portfolio/t_shirt/rgb2.png", scene);
		//red
		groundMaterial.diffuseTexture1 = new BABYLON.Texture("/assets/portfolio/t_shirt/red.png", scene);
		//green
		groundMaterial.diffuseTexture2 = new BABYLON.Texture("/assets/portfolio/t_shirt/green.png", scene);
		//blue
		groundMaterial.diffuseTexture3 = new BABYLON.Texture("/assets/portfolio/t_shirt/blue.png", scene);
		//ciel
		groundMaterial.diffuseTexture4 = new BABYLON.Texture("/assets/portfolio/t_shirt/ciel.png", scene);
		//magenta
		groundMaterial.diffuseTexture5 = new BABYLON.Texture("/assets/portfolio/t_shirt/magenta.jpg", scene);
		//yellow
		groundMaterial.diffuseTexture6 = new BABYLON.Texture("/assets/portfolio/t_shirt/yellow.jpg", scene);
		
		// console.log(groundMaterial)
		box.material = groundMaterial;   
		ground.material = groundMaterial;   
		// meshes[0].material = groundMaterial;   
	
		var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
		light.position = new BABYLON.Vector3(20, 40, 20);
	/*	
		var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
		shadowGenerator.addShadowCaster(box);
		shadowGenerator.useExponentialShadowMap = true;
	*/
	});
	
	menu();
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
