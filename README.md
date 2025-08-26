# Hello World Node.js with Performance Testing

A simple Node.js Express server with Autocannon performance testing setup.

## Features

- 🚀 Express.js Hello World server
- 📊 Multiple API endpoints for testing
- ⚡ Autocannon performance testing integration
- 🎯 Pre-configured test scripts

## Endpoints

- `GET /` - Hello World with timestamp and Node version
- `GET /health` - Health check endpoint
- `GET /api/data` - JSON endpoint with sample data (100 users)

## Getting Started

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Test the endpoints:**
   ```bash
   curl http://localhost:3000
   curl http://localhost:3000/health
   curl http://localhost:3000/api/data
   ```

## Performance Testing

### Quick Tests (using npm scripts)

```bash
# Basic performance test (10 connections, 30 seconds)
npm run perf:basic

# Heavy load test (50 connections, 30 seconds)
npm run perf:heavy

# Test API endpoint specifically
npm run perf:api

# Run multiple tests
npm run perf:all
```

### Advanced Testing (using the test script)

```bash
# Run comprehensive performance tests
node test-performance.js
```

### Manual Autocannon Commands

```bash
# Basic test
autocannon -c 10 -d 30 http://localhost:3000

# High concurrency test
autocannon -c 100 -d 60 http://localhost:3000

# Test with custom headers
autocannon -c 10 -d 30 -H "Accept: application/json" http://localhost:3000/api/data
```

## Understanding the Results

- **Requests/sec**: Average requests per second
- **Latency**: Response time in milliseconds
- **Throughput**: Data transfer rate in bytes/sec
- **Total requests**: Total number of requests completed
- **Errors**: Number of failed requests

## Performance Optimization Tips

1. **Increase connections** (`-c`) to test under higher load
2. **Adjust duration** (`-d`) for longer stress tests
3. **Use pipelining** (`-p`) for HTTP/1.1 optimization
4. **Monitor system resources** during tests
5. **Test different endpoints** to identify bottlenecks

## Example Results

```
┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬──────────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max      │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼──────────┤
│ Latency │ 0 ms │ 0 ms │ 1 ms  │ 1 ms │ 0.01 ms │ 0.12 ms │ 12.34 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴──────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 8,000   │ 8,000   │ 9,500   │ 10,000  │ 9,200   │ 800     │ 8,000   │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘
```