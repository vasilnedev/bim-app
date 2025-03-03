import express from 'express';
import proxy from 'express-http-proxy';

/* 
  This is a simple proxy server that forwards requests to MinIO.
*/

const app = express();
const port = 3000;

// Middleware to allow only GET requests
const allowOnlyGet = (req, res, next) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }
  next();
};

// Proxy for /bim-app
app.use('/bim-app', 
  allowOnlyGet, 
  proxy('http://minio:9000', {
    proxyReqPathResolver: (req) => {
      return `/bim-app${req.url}`;
    }
  })
);

// Proxy for /models
app.use('/models', 
  allowOnlyGet, 
  proxy('http://minio:9000', {
    proxyReqPathResolver: (req) => {
      return `/models${req.url}`;
    }
  })
);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen( port , () => {
  console.log(`Server (proxy to MinIO) running on port ${port}`);
});
