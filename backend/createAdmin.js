const bcrypt = require('bcrypt');
const db = require('./models');

async function createAdmin() {
  try {
    // Get command line arguments or use defaults
    const name = process.argv[2] || 'Admin';
    const email = process.argv[3] || 'admin@yoga.in';
    const rawPassword = process.argv[4] || 'admin@yoga';

    console.log(`Attempting to create admin: ${name} (${email})`);

    // Connect to database
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Check if admin already exists
    const existingAdmin = await db.Admin.findOne({ where: { email } });
    if (existingAdmin) {
      console.log('Admin already exists with this email. Cannot create duplicate.');
      process.exit(0);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // Create the new admin in the database
    const newAdmin = await db.Admin.create({
      name,
      email,
      password: hashedPassword
    });

    console.log('=================================');
    console.log('Admin created successfully!');
    console.log('Name:', newAdmin.name);
    console.log('Email:', newAdmin.email);
    console.log('Password:', rawPassword); // Display the raw password so the user knows what to log in with
    console.log('=================================');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
