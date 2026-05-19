import { signToken } from '../controllers/authController';

describe('JWT Configuration', () => {
  it('should throw an error if JWT_SECRET is not defined', () => {
    const originalSecret = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;
    
    expect(() => {
      signToken('test-id', 'Admin');
    }).toThrow('JWT_SECRET must be defined in environment variables');
    
    if (originalSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalSecret;
    }
  });
});
