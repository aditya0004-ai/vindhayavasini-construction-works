// Run: node utils/setAdminPassword.js "yourPasswordHere"
// Copy the printed hash into ADMIN_PASSWORD_HASH in your .env file.

const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.error("Usage: node utils/setAdminPassword.js <password>");
  process.exit(1);
}

bcrypt.hash(password, 10).then((hash) => {
  console.log("\nAdd this line to your .env file:\n");
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
});