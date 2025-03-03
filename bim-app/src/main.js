import * as THREE from "three";
import * as OBC from "@thatopen/components";

const components = new OBC.Components();
components.init();

const world = components.get( OBC.Worlds ).create();

const container = document.getElementById("app");
world.renderer = new OBC.SimpleRenderer( components, container );

world.camera = new OBC.SimpleCamera( components );
world.camera.controls.setLookAt(12, 6, 8, 0, 0, -10);

world.scene = new OBC.SimpleScene( components );
world.scene.setup();
world.scene.config.backgroundColor = new THREE.Color('#DAAAAA');

components.get( OBC.Grids ).create( world );

const ifcLoader = components.get( OBC.IfcLoader );
ifcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;

ifcLoader.setup()
.then( () => loadIfc( 'small.ifc' ) )
.catch( err => alert( err ) );

const loadIfc = fileName => {
  fetch( '/models/' + fileName )
  .then( response => {
    if( response.status == 200 ){ return response.arrayBuffer(); }
    else{ throw 'Could not read ' + fileName; }
  })
  .then( data => {
    const buffer = new Uint8Array( data );
    return ifcLoader.load( buffer );
  })
  .then( model => { 
    model.name = fileName;
    if( world.scene ) world.scene.three.add( model ); 
  })
  .catch( err => alert( err ));
}
