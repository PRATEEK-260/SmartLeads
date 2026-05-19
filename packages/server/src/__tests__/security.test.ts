import request from 'supertest';
import { app } from '../index';
import mongoose from 'mongoose';

describe('Security Middleware', () => {
  // Ensure we don't leave any open handles
  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('Payload Limit', () => {
    it('should return 413 if payload is larger than 10kb', async () => {
      // Create a payload that is definitely larger than 10kb
      const largePayload = { data: 'a'.repeat(11 * 1024) };
      const response = await request(app)
        .post('/api/auth/register')
        .send(largePayload);
      
      expect(response.status).toBe(413);
    });

    it('should allow payloads smaller than 10kb', async () => {
      const smallPayload = { email: 'test@example.com', password: 'password123' };
      const response = await request(app)
        .post('/api/auth/register')
        .send(smallPayload);
      
      // We don't care about the actual registration result, just that it's not 413
      expect(response.status).not.toBe(413);
    });
  });

  describe('Rate Limiting', () => {
    it('should return 429 after exceeding the limit', async () => {
      // The limit is 100 requests per 15 mins for /api routes.
      // Making 100 requests to /api/auth/login
      
      // Use a sequential loop to avoid overwhelming the test runner, 
      // though it might be slower it is more reliable for rate limit testing.
      for (let i = 0; i < 100; i++) {
        await request(app).get('/api/auth/login');
      }
      
      const response = await request(app).get('/api/auth/login');
      expect(response.status).toBe(429);
      expect(response.text).toBe('Too many requests from this IP, please try again after 15 minutes');
    }, 60000); // 1 minute timeout just in case
  });
});
