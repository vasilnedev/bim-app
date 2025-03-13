import fs from 'fs';
import * as Minio from "minio";

// The script reads all files in the sample_models directory and uploads them to the MinIO bucket. 
  
// Setting up constants for the distribution files path and the MinIO bucket. 
const directoryPath = './sample-models';
const bucketName = 'models';

// Create a new MinIO client
const minioClient = new Minio.Client({
  endPoint: 'minio',
  port: 9000,
  useSSL: false,
  accessKey: 'myminioadmin',
  secretKey: 'myminioadmin'
});

// List all files in the distribution directory and upload to MinIO bucket
fs.readdir( directoryPath, ( err, files) => {
  if( err ){ console.error( err ) }
  else{
    files.forEach( file => {
      const filePath = `${directoryPath}/${file}`;
      const objectName = file;
      minioClient.fPutObject( bucketName, objectName, filePath, err => {
        if( err ){ console.error( err ) }
        else{ console.log(`${file} - uploaded successfully.`); }
      });
    });
  };
});
