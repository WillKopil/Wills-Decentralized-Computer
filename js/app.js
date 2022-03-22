// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

console.log("setting up THREE");

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 4;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});

// Configure renderer clear color
renderer.setClearColor( 0xffffff, 0);

// Configure renderer size
renderer.setSize( window.innerWidth*0.7, window.innerHeight*0.7 );

// Append Renderer to DOM
let renderContainer = document.createElement('div');
renderContainer.setAttribute('style','height:70%;width:70%;margin:auto;');
//document.body.appendChild( renderer.domElement );
renderContainer.appendChild( renderer.domElement );
document.body.appendChild( renderContainer );

//--------------------------------------------------------
// ADDING A CUSTOM MODEL
//--------------------------------------------------------

const loader = new THREE.GLTFLoader();

// Load a glTF resource
loader.load(
	// resource URL
	'assets/water.glb',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);


// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material
//var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//var material = new THREE.MeshBasicMaterial( { color: "#bb1cd4" } );
//var cube = new THREE.Mesh( geometry, material );

// Add cube to Scene
//scene.add( cube );

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
};

render();