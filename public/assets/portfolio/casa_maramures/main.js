
var zooMobile = false, actualD, skyboxMaterial, SautoRot = false;
var progress = 0, sound;
var path = "/assets/portfolio/panorama/res/";  

var scene, light, camera, camerado, cameravr, sceneReady = false;
var isMobile = false, Sfullscreen = false, Svr = false; Sdo = false;
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
		$("#loader>.follow").animate({bottom: '0px'}, "slow", ()=>{createScene();});
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
		if(Smenu) Smenu = !Smenu;
	});
	$("#fullscreen").click(function(){
		//true - no pointer, false - pointer
		engine.switchFullscreen(true);
		if(Smenu) Smenu = !Smenu;
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
		Ssound = !Ssound; 
		if(Ssound) sound.setVolume(0.0);
		else sound.setVolume(0.4);   
	}); 
	$("#menu").click(function(){
		Smenu = !Smenu;
		if(Smenu) 
			$(".menu").animate({left: '0px'}, "slow").show();
		else
			$(".menu").animate({left: -$(".menu")[0].offsetWidth+'px'}, "slow",()=>{$(".menu").hide();});
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
	if(isMobile){
		if(window.innerWidth>window.innerHeight)
			$(".menu").css("top", "50px");
		else 
			$(".menu").css("top", "95px"); 
	} 
}

function showDivInfo(str, param){
	$("#"+str).click(function(){
		param = !param;
		if(param) 
			$("."+str).animate({bottom: '0px'}, "slow").show();
		else
			$("."+str).animate({bottom: -$("."+str)[0].offsetHeight+'px'}, "slow",()=>{$("."+str).hide();});
	});
	$("."+str).click(function(){param = !param;$("."+str).animate({bottom: -$("."+str)[0].offsetHeight+'px'}, "slow",()=>{$("."+str).hide();});});
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
		scene.activeCamera.detachControl(canvas); 
		cameravr.position = scene.activeCamera.position.clone();
		scene.activeCamera = cameravr;
		Svr = !Svr;
	}else{
		if(scene.activeCamera == cameravr){
			if(Sdo && camerado)
				scene.activeCamera = camerado; 
			else
				scene.activeCamera = camera; 
			scene.activeCamera.attachControl(canvas, true);
		} 
	}
});

/// Main function
function createScene() {

	BABYLON.SceneLoader.ShowLoadingScreen = false; 
	BABYLON.Database.IDBStorageEnabled  = false;
	 
	scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color4(1, 1, 1, 1); 

	settingCameras();
	
	light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
 
	GUI = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");
	
	BABYLON.SceneLoader.ImportMesh("", "/assets/portfolio/casa_maramures/", "casa.babylon", scene, function (m,p,s) {
		console.log(m)
	}, function (evt) {
		progress = (evt.loaded * 100 / evt.total).toFixed();
    });

	scene.registerBeforeRender(function () {
		if(SautoRot) scene.activeCamera.alpha+=0.001; 
	}); 
	
	engine.runRenderLoop(function () {
		if(scene){
			if(sceneReady) { 
				scene.render(); 
				fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
			}else{
				loading(progress);
				var remaining = scene.getWaitingItemsCount();
				if (remaining === 0) { 
					sceneReady = true; 
					document.getElementById("loader").style.display = "none";
					document.getElementById("content").style.display = "block";
				}    
			} 
		} 
	});
};

/// Show progress 
var loading = function(progress){
	var div = document.getElementById("loading");
	div.innerHTML = "Loading assets: "+progress+"%";
}

function settingCameras(){
	if (navigator.getVRDisplays)
		cameravr = new BABYLON.WebVRFreeCamera("WebVRCamera", new BABYLON.Vector3(0, 1, 0), scene, false, { trackPosition: false });
	else
		cameravr = new BABYLON.VRDeviceOrientationFreeCamera("vrCam", new BABYLON.Vector3(0, 1, 0), scene);
	cameravr.attachControl(canvas, false);
	cameravr.keysUp = cameravr.keysDown = cameravr.keysLeft = cameravr.keysRight = [];
	
	if(isMobile){
		camerado = new BABYLON.DeviceOrientationCamera("DevOr_camera", new BABYLON.Vector3(0, 10, 0), scene);
		camerado.attachControl(canvas, false); 
		camerado.keysUp = camerado.keysDown = camerado.keysLeft = camerado.keysRight = [];
	}
	
	camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", -Math.PI/2, Math.PI/2, 100, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas,false);
	//camera.fov = 1.4;
	//camera.lowerRadiusLimit = camera.upperRadiusLimit = 1; 
	//camera.panningSensibility = 0; 	
	scene.activeCamera = camera; 
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

function orientationChange() {
	if(isMobile){
		if(window.innerWidth>window.innerHeight)
			$(".menu").css("top", "95px");
		else 
			$(".menu").css("top", "50px");  
	} 
}

// EVENT-URI
window.onorientationchange = orientationChange;
