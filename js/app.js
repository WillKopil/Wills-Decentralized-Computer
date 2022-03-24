// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 4;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});

var controls = new THREE.FirstPersonControls(camera, renderer.domElement);

// Configure renderer clear color
renderer.setClearColor( 0xffffff, 0);

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
let renderContainer = document.createElement('div');
renderContainer.setAttribute('style','z-index: -1;position:absolute;top:0;left:0;');
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
	}
);


// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Ambiant lighting
const light = new THREE.AmbientLight( 0xffffff, 1 ); // soft white light
scene.add( light );

// Create a Cube Mesh with basic material
//var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//var material = new THREE.MeshBasicMaterial( { color: "#bb1cd4" } );
//var cube = new THREE.Mesh( geometry, material );

// Add cube to Scene
//scene.add( cube );

var clock = new THREE.Clock();

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  controls.update(clock.getDelta());

  //planet.rotation.x += 0.01;
  //planet.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
};

render();