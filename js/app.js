// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 10;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});

var controls = new THREE.FirstPersonControls(camera, renderer.domElement);

// Configure renderer clear color
renderer.setClearColor( 0xffffff, 0);

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
let renderContainer = document.createElement('div');
renderContainer.setAttribute('style','z-index: -1;position:fixed;top:0;left:0;');
//document.body.appendChild( renderer.domElement );
renderContainer.appendChild( renderer.domElement );
document.body.appendChild( renderContainer );

//--------------------------------------------------------
// ADDING A CUSTOM MODEL
//--------------------------------------------------------

const loader = new THREE.GLTFLoader();
var forest;

// Load a glTF resource
loader.load(
	// resource URL
	'kokiri/kokiri_forest.gltf',
	// called when the resource is loaded
	function ( gltf ) {
    forest = gltf.scene;
		scene.add( forest );
	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	}
);


// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Ambiant lighting
const light = new THREE.AmbientLight( 0xffffff, 1 ); // soft white light
scene.add( light );

// Camera follow spline
var spline = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( -10, 0, 10 ),
	new THREE.Vector3( -5, 5, 5 ),
	new THREE.Vector3( 0, 0, 0 ),
	new THREE.Vector3( 5, -5, 5 ),
	new THREE.Vector3( 10, 0, 10 )
] );

//Add spline to scene
const points = spline.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );

scene.add(curveObject);

var camPosIndex = 0;

var clock = new THREE.Clock();

//Debuging
setInterval(function(){
	console.log("X: " + camera.position.x);
},1000);

// Render Loop
var render = function () {
  requestAnimationFrame( render );


  /*
  // Camera follow spline
  camPosIndex++;
  if (camPosIndex > 10000) {
    camPosIndex = 0;
  }
  
  var camPos = spline.getPoint(camPosIndex / 10000);
  var camRot = spline.getTangent(camPosIndex / 10000);

  camera.position.x = camPos.x;
  camera.position.y = camPos.y;
  camera.position.z = camPos.z;
  
  camera.rotation.x = camRot.x;
  camera.rotation.y = camRot.y;
  camera.rotation.z = camRot.z;
  
  camera.lookAt(spline.getPoint((camPosIndex+1) / 10000));
  */


  //This line allows camera control via keys and mouse
  controls.update(clock.getDelta());

  //planet.rotation.x += 0.01;
  //planet.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
};

render();