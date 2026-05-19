import request from 'supertest';
import { app } from '../index';
import mongoose from 'mongoose';

describe('CORS Configuration', () => {
  // Ensure we don't leave any open handles
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should allow requests from http://localhost:5173', async () => {
    const response = await request(app)
      .get('/health')
      .set('Origin', 'http://localhost:5173');
    
    expect(response.status).toBe(200);
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:5173');
  });

  it('should allow requests from http://localhost', async () => {
    const response = await request(app)
      .get('/health')
      .set('Origin', 'http://localhost');
    
    expect(response.status).toBe(200);
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost');
  });

  it('should allow requests with no origin', async () => {
    const response = await request(app)
      .get('/health');
    
    expect(response.status).toBe(200);
    // When no origin is provided, access-control-allow-origin is typically not set
    expect(response.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('should block requests from unauthorized origins', async () => {
    const response = await request(app)
      .get('/health')
      .set('Origin', 'http://unauthorized.com');
    
    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      status: 'error',
      message: 'The CORS policy for this site does not allow access from the specified Origin.'
    });
  });
});
