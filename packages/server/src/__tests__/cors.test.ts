import request from 'supertest';
import { app } from '../index';
import mongoose from 'mongoose';

describe('CORS Policy', () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should allow requests from http://localhost:5173', async () => {
    const response = await request(app)
      .get('/health')
      .set('Origin', 'http://localhost:5173');
    
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:5173');
  });

  it('should allow requests from http://localhost', async () => {
    const response = await request(app)
      .get('/health')
      .set('Origin', 'http://localhost');
    
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost');
  });

  it('should deny requests from untrusted origins', async () => {
    const response = await request(app)
      .get('/health')
      .set('Origin', 'http://untrusted-origin.com');
    
    // In express-cors, if origin is rejected, it usually returns an error to the callback, 
    // which in Express middleware might end up with a 500 error or similar depending on error handling.
    // Or it might just not set the CORS headers.
    expect(response.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('should allow requests with no origin (like curl)', async () => {
    const response = await request(app)
      .get('/health');
    
    expect(response.status).toBe(200);
    expect(response.headers['access-control-allow-origin']).toBeUndefined();
  });
});
