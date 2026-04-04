 
var zooMobile = false, actualD, skyboxMaterial, SautoRot = false;
var index = 3, textures = [], entries = [], sound;
var path = "/assets/portfolio/panorama/res2/", progress = 0;  

var scene, light, camera, camerado, sceneReady = false;
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
		$("#loader>.follow").animate({bottom: '0px'}, "slow", ()=>{create_scene();});
	} 
}  

function menu(){
	//true change color when is close
	arrows(".footer_click", ".bottom_banner");
	arrows(".header_click", ".top_banner");
	
	showDivInfo("about", Sabout);
	showDivInfo("info", Sinfo); 
	
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
	
	if(!isMobile){
		$("#tablet").css("color","#7a7a7a").css("cursor","auto");
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

function create_scene(){
	if (typeof(window.orientation) != "undefined") isMobile = true;
	
	BABYLON.SceneLoader.ShowLoadingScreen = false; 
	BABYLON.Database.IDBStorageEnabled  = false;
	
	scene = new BABYLON.Scene(engine);   
	scene.clearColor = new BABYLON.Color4(1, 1, 1, 0); 
	
	var VRHelper = scene.createDefaultVRExperience({rayLength:1000, useCustomVRButton: true, customVRButton: document.getElementById("vr")});
    VRHelper.enableInteractions();
 
	VRHelper.onNewMeshSelected.add(function(mesh) {
		if(mesh.index != null){
			index = mesh.index;
			setCamAnimation();
		}
	});

	VRHelper.onExitingVR.add(function(){
		VRHelper._deviceOrientationCamera = (Sdo == true && camerado) ? camerado : camera;
	});
	
	//Adding a light 
	light = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
	light.groundColor = new BABYLON.Color3(1, 1, 1);
	light.shadowEnabled = false;
	light.specular = new BABYLON.Color3(0, 0, 0);
	
	settingCameras();
	
	//cursorul - pt pc
	if(!isMobile)
	{
		scene.constantlyUpdateMeshUnderPointer = true;
		scene.onPointerObservable.add(function (evt) {
			if (evt.pickInfo.pickedMesh != null && evt.pickInfo.pickedMesh.index != null) { 
				canvas.style.cursor = "pointer";  
				evt.pickInfo.pickedMesh.renderOutline = true;
			}else{
				for(var i=0;i<entries.length;i++){
					for(var j=0;j<entries[i].length;j++){
						entries[i][j].renderOutline = false;
					}
				}
			}
		}, BABYLON.PointerEventTypes.POINTERMOVE);			
	} 
		
	scene.onPointerDown = function (evt, pickResult) {
		if (pickResult.hit && pickResult.pickedMesh!=null && pickResult.pickedMesh.index!=null) {
			index = pickResult.pickedMesh.index;
			if(scene.activeCamera instanceof BABYLON.DeviceOrientationCamera)
				setCamAnimation();
			else
				CamToTarget(pickResult.pickedMesh.position);
		}
	};
	  
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
			} 
		} 
	});
	
	load_images();
	create_Entries();
	
	skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	
	var skybox = BABYLON.MeshBuilder.CreateSphere("skySphere", {segments:16, diameter: 1000}, scene);
	skybox.material = skyboxMaterial;	
	
	skyboxMaterial.imageProcessingConfiguration.contrast = 1.4; 
	skyboxMaterial.imageProcessingConfiguration.exposure = 1.4;
	
	menu();
}

/// Show progress 
var loading = function(progress){
	var div = document.getElementById("loading");
	div.innerHTML = "Loading images: "+progress+"%";
}

/// First download all images
function load_images(){
	
	var loader = new BABYLON.AssetsManager(scene);
	loader.useDefaultLoadingScreen = false;
	
	for(var i=0;i<5;i++){
		if(i==2 || i==4)
			var img = loader.addTextureTask(i, path+i+".png");
		else
			var img = loader.addTextureTask(i, path+i+".jpg");
		
		img.onSuccess = function(t) {
			textures[t.name] = t.texture;
		};
	}
	
	loader.onFinish = function() {
		getBackground();

        sceneReady = true;  
		document.getElementById("loader").style.display = "none";
		document.getElementById("content").style.display = "block";
	};

    loader.onProgressObservable.add(function(progres){
		progress = parseInt((progres.totalCount - progres.remainingCount)*100/progres.totalCount);
    })

	loader.load();
	
}

function settingCameras(){
	if(isMobile){
		camerado = new BABYLON.DeviceOrientationCamera("DevOr_camera", new BABYLON.Vector3(0, 10, 0), scene);
		camerado.attachControl(canvas, false); 
		camerado.keysUp = camerado.keysDown = camerado.keysLeft = camerado.keysRight = [];
	}
	
	camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, Math.PI/2, 1, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas,false);
	camera.fov = 1.6;
	camera.lowerRadiusLimit = camera.upperRadiusLimit = 1; 
	camera.panningSensibility = 0; 	
	scene.activeCamera = camera; 
}

function CamToTarget(toTarget){
	
	scene.activeCamera.animations = [];
	var animationCam = new BABYLON.Animation("animCam", "target", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    var a = [];
    a.push({ frame: 0, value: scene.activeCamera.target });
    a.push({ frame: 30, value: toTarget });
	animationCam.setKeys(a);
    
	var qe = new BABYLON.QuadraticEase;
	qe.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
	animationCam.setEasingFunction(qe);
		
	scene.activeCamera.animations.push(animationCam); 
	scene.beginAnimation(scene.activeCamera, 0, 30, false, 1.0, ()=>{
		setCamAnimation();
		scene.activeCamera.setTarget(BABYLON.Vector3.Zero());
	});  
}

function setCamAnimation(){
	scene.activeCamera.animations = [];
	var animationCam = new BABYLON.Animation("Cinematique", "fov", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	
	var a = [];
	a.push({ frame : 0,	value : 0.1 }),
	a.push({ frame : 15, value : 1.6 });
	animationCam.setKeys(a);

	var qe = new BABYLON.QuadraticEase;
	qe.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
	animationCam.setEasingFunction(qe);
	
	var anim2 = new BABYLON.AnimationEvent(0, function () { 
		scene.activeCamera.alpha = 0; 
		getBackground(); 
	}, false);     
	animationCam.addEvent(anim2);
	
	scene.activeCamera.animations.push(animationCam);
	scene.beginAnimation(scene.activeCamera, 0, 15, false); 
}  
 
function getBackground(){
	
	skyboxMaterial.diffuseTexture = textures[index];
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.diffuseTexture.uScale = 1;
    skyboxMaterial.diffuseTexture.vScale = -1;
	
	for(var i=0;i<entries.length;i++){
		for(var j=0;j<entries[i].length;j++){
			if(i==index) 
				entries[i][j].isVisible = true;
			else
				entries[i][j].isVisible = false;
		}
	}
}

function create_Entries(){
	var entr1 = setEntries(1, new BABYLON.Vector3(150, -30, -450));
	var entr2 = setEntries(3, new BABYLON.Vector3(-400, -30, 150));
	entries[0] = [entr1, entr2];
	
	var entr1 = setEntries(0, new BABYLON.Vector3(-450, -30, -50));
	var entr2 = setEntries(4, new BABYLON.Vector3(-200, -30, -200));
	entries[1] = [entr1, entr2];
	
	var entr1 = setEntries(3, new BABYLON.Vector3(-450, -30, -160));
	entries[2] = [entr1];
	  
	var entr1 = setEntries(2, new BABYLON.Vector3(450, -30, 120));
	var entr2 = setEntries(0, new BABYLON.Vector3(-450, -60, 100));
	entries[3] = [entr1, entr2];
	
	var entr1 = setEntries(1, new BABYLON.Vector3(250, -50, -70));
	entries[4] = [entr1];
	
}

function setEntries(index, position){
	var planeTexture = new BABYLON.Texture(path+"arrow_up.png", scene);
	planeTexture.hasAlpha = true;
	 
	var planeMaterial = new BABYLON.StandardMaterial("plane material", scene);
	planeMaterial.backFaceCulling = false;
	planeMaterial.diffuseTexture = planeTexture;
	planeMaterial.opacityTexture = planeTexture;

	var plane = BABYLON.Mesh.CreatePlane("plane", 60, scene);
	plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;	
	plane.material = planeMaterial;
	plane.position = position;
	plane.scaling = new BABYLON.Vector3(.5,.5,.5);
	plane.index = index;
	plane.outlineColor = BABYLON.Color3.White();
	plane.outlineWidth = 1;
	
	return plane;
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

var wheelit = function (e) {
	var e = window.event || e; // old IE support 
	var delta = Math.max(-1, Math.min(1,(-e.wheelDelta || e.detail)));

	if (delta > 0  && scene.activeCamera.fov >= 2) return;
	if (delta < 0  && scene.activeCamera.fov <= 1) return;
	
	scene.activeCamera.fov += delta * 0.1;   
};

canvas.addEventListener('mousewheel', wheelit, false);
canvas.addEventListener('DOMMouseScroll', wheelit, false);
	
canvas.addEventListener('touchstart', ts, false);
canvas.addEventListener('touchmove', tm, false);
canvas.addEventListener('touchend', te, false);

function ts(e){
	var ev = e.originalEvent || e;
	if(ev.touches.length == 2) {
		zooMobile = true;
		var distX = ev.touches[0].pageX - ev.touches[1].pageX; 
		var distY = ev.touches[0].pageY - ev.touches[1].pageY;
		var pinchSquaredDistance = (distX * distX) + (distY * distY);
		actualD = Math.sqrt(pinchSquaredDistance);
	}
}

function tm(e){
	var ev = e.originalEvent || e;
	if(zooMobile){
		var distX = ev.touches[0].pageX - ev.touches[1].pageX; 
		var distY = ev.touches[0].pageY - ev.touches[1].pageY;
		var pinchSquaredDistance = (distX * distX) + (distY * distY);
		var dist = Math.sqrt(pinchSquaredDistance);
	
		var delta = 1; 
		if(parseFloat(dist-actualD)>0) delta = -1;
		
		if (delta > 0  && scene.activeCamera.fov >= 2) zooMobile = false;
		if (delta < 0  && scene.activeCamera.fov <= 1) zooMobile = false;
	 
		if(!zooMobile) return;
		 
		scene.activeCamera.fov += delta * 0.1; 
	} 
}

function te(e){
	zooMobile = false; 
	actualD = 0;
}