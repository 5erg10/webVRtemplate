if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;

var camera, scene, renderer, effect, controls, room, crosshair;

var mesh, lightMesh, geometry;
var spheres = [];

var directionalLight, pointLight;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

init();
animate();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x505050);
	//scene.fog = new THREE.Fog(new THREE.Color(0x505050), 0.0025, 20);

	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10000);
	camera.layers.enable(1);
	camera.position.z = 0.01;
	scene.add(camera);

	room = new THREE.Mesh(
		new THREE.BoxGeometry( 300, 300, 300, 8, 8, 8 ),
		new THREE.MeshBasicMaterial( { color: 0x404040, wireframe: true } )
	);
	room.name = "wireframe";
	scene.add( room );

	scene.add( new THREE.HemisphereLight( 0x606060, 0x404040 ) );

	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 1, 1, 1 ).normalize();
	scene.add( light );

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	container.appendChild( renderer.domElement );

	console.log(renderer.info);

	effect = new THREE.StereoEffect( renderer );
	effect.setSize( window.innerWidth, window.innerHeight );

	crosshair = new THREE.Mesh(
		new THREE.RingGeometry(0.02, 0.04, 32),
		new THREE.MeshBasicMaterial({
			color: 0xffffff,
			opacity: 0.5,
			transparent: true
		})
	);
	crosshair.position.z = - 2;
	camera.add(crosshair);

	 if (window.DeviceOrientationEvent && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	 	controls = new THREE.DeviceOrientationControls( camera );
	 }
	 else {
	 	controls = new THREE.OrbitControls( camera, renderer.domElement );
	 }

	window.addEventListener( 'resize', onWindowResize, false );

	buildShape();
}

function buildShape(){

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	effect.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - windowHalfX ) * 10;
	mouseY = ( event.clientY - windowHalfY ) * 10;

}

//

function animate() {

	requestAnimationFrame( animate );

	controls.update();

	render();

}

function render() {

	effect.render( scene, camera );

}

function toggleFullscreen(elem) {
  elem = elem || document.documentElement;
  if (!document.fullscreenElement && !document.mozFullScreenElement &&
    !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

document.getElementById('btnFullscreen').addEventListener('click', function() {
  toggleFullscreen();
});