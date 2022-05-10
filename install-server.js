const { spawn } = require('child_process');

const child = spawn('bash', ['start-server.sh']);

child.stdout.on('data', (data) => {
  process.stdout.write(`${data}`);

  if(`${data}`.includes('Starting Loader, output incoming')) {
    process.exit(0);
  }
});

child.stderr.on('data', (data) => {
  process.stdout.write(`${data}`);
});
