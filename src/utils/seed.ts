import connection from '../config/connections.js';
import { User, Thoughts } from '../models/index.js';
import { userData, getRandomItems } from './data.js';

// Create functions to generate random data
const getRandomUser = () => {
  const randomUser = userData[Math.floor(Math.random() * userData.length)];
  return {
    username: randomUser.username,
    email: randomUser.email
  };
};

const getRandomThought = (users: string | any[]) => {
  const randomUser = users[Math.floor(Math.random() * users.length)];
  const user = userData.find(u => u.username === randomUser.username);
  const randomThought = user ? getRandomItems(user.thoughtText, 1)[0] : '';
  
  return {
    thoughtText: randomThought,
    username: randomUser.username,
    reactions: [] // You can add random reactions here if needed
  };
};

connection.on('error', (error) => console.error(error));

connection.once('open', async () => {
  console.log('Connected');
  
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thoughts.deleteMany({});

    // Create users
    const users = Array.from({ length: 10 }, getRandomUser);
    const createdUsers = await User.create(users);

    // Create thoughts
    const thoughts = Array.from({ length: 100 }, () => getRandomThought(createdUsers));
    await Thoughts.create(thoughts);

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await connection.close();
    console.log('Connection closed');
  }
});