
var progress = 0, sceneReady = false, scene, camera, GUI, isMobile = false;
var canvas = document.getElementById("canvas"); 
var engine = new BABYLON.Engine(canvas, true);

/// Init 3D scene
function initBBjsScene(dimensions, extent, mapurl, cords, hasObj3D)
{
	if(scene){
		document.getElementById("loading").style.display = "block";
		createScene(dimensions, extent, mapurl, cords, hasObj3D);
	} 
}

/// Main function
var createScene = function (dimensions, extent, mapurl, cords, hasObj3D) {

	GUI = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
	
	initializeTiles(dimensions[0], dimensions[1], extent, mapurl); 
	importMesh(hasObj3D);
	
	scene.registerBeforeRender(function () {
		 
		if(camera.radius==400){
			camera.radius = 300;
			 
			
			create_map(cords);
			emptyScene();
			
			mapid.style.display = "block";
			select.style.display = "block";			
		}
	});    
};

/// Dispose entire scene
var emptyScene = function(){ 
	sceneReady = false;
   
	// Release meshes
	while (scene.meshes.length) {
		scene.meshes[0].dispose(true);
	}
	// Release materials
	if (scene.defaultMaterial) {
		scene.defaultMaterial.dispose()
	}
	while (scene.multiMaterials.length) {
		scene.multiMaterials[0].dispose();
	}
	while (scene.materials.length) {
		scene.materials[0].dispose();
	}
	// Release textures
	while (scene.textures.length) {
		scene.textures[0].dispose();
	} 

	scene.onDisposeObservable.notifyObservers(this);
	scene.onDisposeObservable.clear();
    scene.onBeforeRenderObservable.clear();	
} 

/// Show progress 
var loading = function(progress){
	var div = document.getElementById("loading");
	div.innerHTML = "Loading assets : "+progress+"%";
}

/// Import 3d assets on map
var importMesh = function(name) {
	var marker = true;
	var name = "marker";
	var label = "Nothing to display over here";
	 
	if(hasObj3D>=0) {
		name = infos[hasObj3D].resource;
		marker = false;
		label = infos[hasObj3D].label;
	}
	BABYLON.SceneLoader.ImportMesh("", "/assets/portfolio/worldmap/res/"+name+"/", name + ".babylon", scene, function (m,p,s) {

		if(marker)
		{
			m[0].scaling = new BABYLON.Vector3(0.3,0.3,0.3);
			m[0].position = BABYLON.Vector3.Zero();
			 
			makeLabel(m[0], 100, label);
		}else{  
			//console.log(m[0])
			//console.log(scene.meshes)
			//console.log(scene.materials)
			m[0].scaling = new BABYLON.Vector3(0.15,0.15,0.15);
			m[0].position = BABYLON.Vector3.Zero();
			
			makeLabel(m[0], 100, label);
		}
		
	}, function (evt) {
		progress = (evt.loaded * 100 / evt.total).toFixed();
	});
}

var makeLabel = function (mesh, xOff, text) {
	
	var rect1 = new BABYLON.GUI.Rectangle();
	rect1.width = (isMobile == true)?"180px":0.29;
	rect1.fontSize = (isMobile == true)?"10px":"16px";
	rect1.height = (isMobile == true)?"16px":"20px";
	rect1.cornerRadius = 10;
	rect1.color = "white"; 
	rect1.thickness = 1;
	rect1.background = "black";
	GUI.addControl(rect1);
	rect1.linkWithMesh(mesh);   
	rect1.linkOffsetY = -90;
	rect1.linkOffsetX = xOff;
	var label0 = new BABYLON.GUI.TextBlock();
	label0.text = text;
	label0.color = "white";
	label0.textVerticalAlignment = 0;
	rect1.addControl(label0);

	var line = new BABYLON.GUI.Line();
    line.y2 = "11px";
    line.lineWidth = 1;
    GUI.addControl(line); 
    line.linkWithMesh(mesh);
    line.connectedControl = rect1;

    var endRound = new BABYLON.GUI.Ellipse();
    endRound.width = "10px";
    endRound.background = "black";
    endRound.height = "10px";
    endRound.color = "white";
    GUI.addControl(endRound);
    endRound.linkWithMesh(mesh); 
}

var initScene = function(){
	
	if (typeof(window.orientation) != "undefined") isMobile = true;
	
	if (!webGLDetect() || !BABYLON.Engine.isSupported())  
	{   
		document.getElementById("webGLwarning").style.display = "block";
		return;
	}
	
	BABYLON.SceneLoader.ShowLoadingScreen = false; 
	BABYLON.Database.IDBStorageEnabled  = false;
	 
	scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color4(1, 1, 1, 1); 
	 
	camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, 0, 300, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, true); 
	camera.upperBetaLimit = 1.35;
	camera.lowerRadiusLimit = 20;  
	camera.upperRadiusLimit = 400;  
	camera.panningSensibility = 0;
	
	var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

	engine.runRenderLoop(function () {
		if(scene && scene.meshes.length>0){
			if(sceneReady) { 
				scene.render(); 
			}else{
				loading(progress);
				var remaining = scene.getWaitingItemsCount();
				if (remaining === 0) { 
					document.getElementById("loading").style.display = "none";
					sceneReady = true;  
					camera.alpha = -Math.PI/2;
					camera.radius = 300;
					camera.beta = 0; 
					progress = 0;
				}    
			} 
		}
		
		if(map){
			var centerMap = map.getCenter();
			document.getElementById("coords").innerHTML = "Lat: " + centerMap.lat.toFixed(3) + " Long: " + centerMap.lng.toFixed(3);
		}
	});
}

/// Detect webGL 
var webGLDetect = function() {
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

/// Events
window.addEventListener("resize", function() { engine.resize();});
window.addEventListener( "contextmenu", function(e) {e.preventDefault();}, false);  

function initializeTiles(width, height, extent, mapurl){
	
	var extentString = extent._southWest.lng + "," 
		+ extent._southWest.lat + "," 
		+ extent._northEast.lng + "," 
		+ extent._northEast.lat;
		
	var imageUrl = mapurl+"/export?"
		+ "bbox="+ extentString+"&bboxSR=4326&layers=&layerDefs=&size=" + window.innerWidth +"%2C" + window.innerHeight 
		+ "&imageSR=&format=jpg&transparent=false&dpi=&time=&layerTimeOptions=&dynamicLayers=&gdbVersion=&mapScale=&f=image";
	
	var plane = BABYLON.MeshBuilder.CreatePlane("plane", {width: width, height:height}, scene);
	plane.rotation.x = Math.PI/2;
	plane.scaling = new BABYLON.Vector3(0.32,0.32,0.32); 
	
	var newMat = new BABYLON.StandardMaterial("material", scene);
	newMat.diffuseTexture = new BABYLON.Texture(imageUrl, scene);
	newMat.diffuseTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
	newMat.diffuseTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
	newMat.specularColor = new BABYLON.Color4(0, 0, 0, 0);
	newMat.backFaceCulling = false;
	
	//Assign
	plane.material = newMat;
}

initScene();