const autocannon = require('autocannon');

// Performance test configuration
const tests = [
  {
    name: 'Hello World Endpoint',
    url: 'http://localhost:3000',
    connections: 10,
    duration: 10
  },
  {
    name: 'API Data Endpoint',
    url: 'http://localhost:3000/api/data',
    connections: 10,
    duration: 10
  },
  {
    name: 'Health Check Endpoint',
    url: 'http://localhost:3000/health',
    connections: 20,
    duration: 10
  }
];

async function runPerformanceTests() {
  console.log('🚀 Starting Performance Tests...\n');
  
  for (const test of tests) {
    console.log(`📊 Testing: ${test.name}`);
    console.log(`🔗 URL: ${test.url}`);
    console.log(`⚡ Connections: ${test.connections}, Duration: ${test.duration}s\n`);
    
    try {
      const result = await autocannon({
        url: test.url,
        connections: test.connections,
        duration: test.duration,
        pipelining: 1
      });
      
      console.log(`✅ ${test.name} Results:`);
      console.log(`   Requests/sec: ${result.requests.average}`);
      console.log(`   Latency avg: ${result.latency.average}ms`);
      console.log(`   Throughput: ${result.throughput.average} bytes/sec`);
      console.log(`   Total requests: ${result.requests.total}`);
      console.log(`   Errors: ${result.errors}`);
      console.log('─'.repeat(50));
      
    } catch (error) {
      console.error(`❌ Error testing ${test.name}:`, error.message);
    }
  }
  
  console.log('🎉 Performance testing completed!');
}

// Check if server is running before starting tests
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000/health');
    if (response.ok) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

async function main() {
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.log('❌ Server is not running on http://localhost:3000');
    console.log('💡 Please start the server first with: npm start');
    process.exit(1);
  }
  
  await runPerformanceTests();
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { runPerformanceTests, checkServer };