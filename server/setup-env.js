const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

// Check if .env file exists
if (!fs.existsSync(envPath)) {
  console.log('Creating .env file...');
  
  const envContent = `# OpenAI API Configuration
# Replace 'your_openai_api_key_here' with your actual OpenAI API key
OPENAI_API_KEY=your_openai_api_key_here

# Other environment variables
NODE_ENV=development
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('📝 Please edit the .env file and replace "your_openai_api_key_here" with your actual OpenAI API key');
} else {
  console.log('✅ .env file already exists');
  console.log('📝 Make sure your OPENAI_API_KEY is set correctly in the .env file');
}

console.log('\n🔧 Next steps:');
console.log('1. Get your OpenAI API key from https://platform.openai.com/api-keys');
console.log('2. Edit the .env file and replace "your_openai_api_key_here" with your actual key');
console.log('3. Run "npm install" in the server directory to install dependencies');
console.log('4. Start your server with "npm run start:backend"'); 