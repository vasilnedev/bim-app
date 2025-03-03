import * as Minio from 'minio';

const modelsBucket = 'test';

// Create a new MinIO client
const minioClient = new Minio.Client({
  endPoint: 'minio',
  port: 9000,
  useSSL: false,
  accessKey: 'myminioadmin',
  secretKey: 'myminioadmin'
});

// Function to create a bucket
const createBucket = async (bucketName) => {
  try {
    const bucketExists = await minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      await minioClient.makeBucket(bucketName, 'us-east-1');
      console.log(`Bucket "${bucketName}" created successfully.`);
    } else {
      console.log(`Bucket "${bucketName}" already exists.`);
    }
  } catch (err) {
    console.error('Error creating bucket:', err);
  }
};

// Function to set bucket policy to public
const setBucketPolicy = async (bucketName) => {
  const policy = {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: '*',
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${bucketName}/*`]
      }
    ]
  };

  try {
    await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy) );
    console.log(`Bucket policy for "${bucketName}" set to public.`);
  } catch (err) {
    console.error('Error setting bucket policy:', err);
  }
};

// Main function to create bucket and set policy
const setupBucket = async () => {
  await createBucket(modelsBucket);
  await setBucketPolicy(modelsBucket);
};

setupBucket().then(() => {
  console.log('Setup complete.');
}).catch(err => {
  console.error('Setup failed:', err);
});
