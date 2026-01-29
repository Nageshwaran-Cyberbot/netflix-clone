import mongoose from 'mongoose';
import { User } from './models/User.js';
import { config } from './config/env.js';

async function createDemoUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.mongoUri);
    console.log('✅ Connected to MongoDB');

    // Check if demo user exists
    const existingUser = await User.findOne({ email: 'demo@netflix.com' });
    
    if (existingUser) {
      console.log('ℹ️  Demo user already exists');
      console.log('📧 Email: demo@netflix.com');
      console.log('🔑 Password: demo123');
      await mongoose.connection.close();
      return;
    }

    // Create demo user
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@netflix.com',
      password: 'demo123', // Will be hashed by the model
    });

    console.log('✅ Demo user created successfully!');
    console.log('📧 Email: demo@netflix.com');
    console.log('🔑 Password: demo123');
    console.log('👤 User ID:', demoUser._id);

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error creating demo user:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

createDemoUser();
