/**
 * Seed Script - Creates a default admin user
 * Run with: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const existing = await User.findOne({ email: 'admin@taskflow.com' });
  if (existing) {
    console.log('✅ Admin already exists:', existing.email);
    process.exit(0);
  }

  await User.create({
    name: 'Admin',
    email: 'admin@taskflow.com',
    password: 'admin123',
    role: 'admin',
  });

  console.log('✅ Admin user created:');
  console.log('   Email:    admin@taskflow.com');
  console.log('   Password: admin123');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
