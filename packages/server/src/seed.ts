import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Lead from './models/Lead';

dotenv.config();

const usersData = [
  { name: 'Alex Carter', email: 'admin@servicehive.com', password: 'password123', role: 'Admin' },
  { name: 'Sarah Jenkins', email: 'sarah.j@startup.io', password: 'password123', role: 'Sales' },
  { name: 'Marcus Holloway', email: 'm.holloway@techcorp.com', password: 'password123', role: 'Sales' },
  { name: 'David Chen', email: 'dchen@global.net', password: 'password123', role: 'Sales' },
  { name: 'Elena Rodriguez', email: 'elena.rod@fintech.com', password: 'password123', role: 'Sales' },
];

const leadNames = [
  'James Wilson', 'Emma Thompson', 'Liam O\'Brien', 'Olivia Garcia', 'Noah Smith',
  'Sophia Miller', 'Jackson Davis', 'Ava Martinez', 'Lucas Taylor', 'Isabella Anderson',
  'Aiden Thomas', 'Mia Moore', 'Ethan Jackson', 'Charlotte Martin', 'Mason Lee',
  'Amelia White', 'Caden Harris', 'Harper Clark', 'Elijah Lewis', 'Evelyn Robinson',
  'Logan Walker', 'Abigail Young', 'Benjamin Hall', 'Emily Allen', 'Jacob Wright',
  'Elizabeth King', 'William Scott', 'Sofia Green', 'Michael Baker', 'Avery Adams',
  'Alexander Nelson', 'Ella Hill', 'Sebastian Ramirez', 'Scarlett Campbell', 'Jack Mitchell',
  'Victoria Roberts', 'Daniel Carter', 'Grace Phillips', 'Matthew Evans', 'Chloe Turner',
  'Samuel Torres', 'Camila Parker', 'David Collins', 'Penelope Edwards', 'Joseph Stewart',
  'Layla Morris', 'Carter Nguyen', 'Riley Murphy', 'Owen Rivera', 'Zoey Cook'
];

const sources = ['Website', 'Instagram', 'Referral'] as const;
const statuses = ['New', 'Contacted', 'Qualified', 'Lost'] as const;

const seed = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/servicehive';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Lead.deleteMany({});
    console.log('Cleared existing data.');

    // Create Users
    // Note: The pre-save hook in User model might try to set the first user as Admin.
    // We'll create them sequentially to be safe or just use the role from data.
    const createdUsers = [];
    for (const u of usersData) {
      const user = await User.create(u);
      createdUsers.push(user);
    }
    console.log(`Created ${createdUsers.length} users.`);

    const salesUsers = createdUsers.filter(u => u.role === 'Sales');

    // Create 50 Leads
    const leads = [];
    for (let i = 0; i < 50; i++) {
      const name = leadNames[i];
      const email = `${name.toLowerCase().replace(' ', '.')}@example.com`;
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const source = sources[Math.floor(Math.random() * sources.length)];
      const assignedTo = salesUsers[Math.floor(Math.random() * salesUsers.length)]._id;
      
      // Randomize creation date over the last 30 days
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));

      leads.push({
        name,
        email,
        status,
        source,
        assignedTo,
        createdAt
      });
    }

    await Lead.insertMany(leads);
    console.log(`Created ${leads.length} leads.`);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seed();
