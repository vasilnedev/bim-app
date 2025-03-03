import fs from 'fs';
import * as Minio from "minio";

/* 
  This script is used to deploy the built BIM application to a MinIO bucket.

  This script will remove all objects from the bucket to clean it up, then 
  fix the reference attributes within index.html file before uploading 
  and finally upload all distribution files to the MinIO bucket.

  Note that, for this solution to work, the distribution path must not have sub-folders.
  This is done by setting the build option in the vite.config.js to:
  export default {
    build: {
        outDir: 'dist',
        assetsDir: ''
    }
  }; 
*/
  
// Setting up constants for the distribution files path and the MinIO bucket. 
const distPath = './dist';
const deploymentBucket = 'bim-app';

// Create a new MinIO client
const minioClient = new Minio.Client({
  endPoint: 'minio',
  port: 9000,
  useSSL: false,
  accessKey: 'myminioadmin',
  secretKey: 'myminioadmin'
});

/* 
  List all objects in the deployment bucket to be removed to clean the bucket 
  before uploading new files. 
*/
const listObjects = bucketName => {
  return new Promise(( resolve, reject ) => {
    const objectsList = [];
    const stream = minioClient.listObjectsV2(bucketName, '', true);
    stream.on('data', obj => objectsList.push( obj.name ));
    stream.on('end', () => resolve( objectsList ));
    stream.on('error', err => reject( err ));
  });
};

// Remove all objects from a bucket
const removeAllObjects =  ( bucketName, objectsList ) => {
  return new Promise(( resolve, reject ) => {
    if (objectsList.length > 0) {
      minioClient.removeObjects( bucketName, objectsList, err => {
        if( err ) reject( err );
        console.log( 'All objects removed successfully.\n' );
        resolve();
      });
    } else {
      console.log('The bucket is empty.\n');
      resolve();
    }
  });
};

// List all files in the distribution directory and upload to MinIO bucket
const uploadFiles = ( directoryPath, bucketName ) => {
  return new Promise(( resolve, reject ) => {
    fs.readdir( directoryPath, ( err, files) => {
      if( err ) reject( err );
      files.forEach(file => {
        const filePath = `${directoryPath}/${file}`;
        const objectName = file;
        minioClient.fPutObject( bucketName, objectName, filePath, err => {
          if( err ) reject( err );
          console.log(`${file} - uploaded successfully.`);
        });
      });
      resolve( );
    });
  });
};

/* 
  Fix index.html file content before uploading to MinIO.
  Vite build script places slashes in fornt of all href="/... and src=/... refrences.
  This causes the brawser to point to the root location, instead of the index.html location. 
  A solution is to remove all leading slashes from href and src attributes. 
*/
const fixIndexHtml = directoryPath => {
  return new Promise(( resolve, reject ) => {
    const filePath = `${directoryPath}/index.html`;
    
    // Read the file asynchronously
    fs.readFile(filePath, 'utf8', ( err, data ) =>{
      if( err ) reject( err ); 

      // Remove all leading slashes from href and src attributes
      const replacements =[
        { old: /href="\//g , new: 'href="' },
        { old: /src="\//g  , new: 'src="' }
      ];
      replacements.forEach( replacement => {
        data = data.replace( replacement.old, replacement.new );
      });

      // Write the modified content back to the file
      fs.writeFile( filePath, data, 'utf8', err => {
        if( err ) reject( err );
        console.log('index.html after replacements:\n', data);
        resolve( );
      });
    });
  })
};

// In parallel fix index.html and clear the deployment bucket. Then upload all files.
Promise.all([
  fixIndexHtml( distPath ),
  listObjects( deploymentBucket )
  .then( objectsList => removeAllObjects( deploymentBucket, objectsList ) )
])
.then( () => uploadFiles( distPath, deploymentBucket) )
.catch( err => console.error( err ));
