const { spawn } = require('child_process');

const child = spawn('bash', ['start-server.sh']);

child.stdout.on('data', (data) => {
    process.stdout.write(`${data}`);

    if(`${data}`.includes('[minecraft/DedicatedServer]: Done (')) {
        child.stdin.write("kubejs export\n");
    }

    if(`${data}`.includes('[minecraft/DedicatedServer]: Done! Export in kubejs/exported/kubejs-server-export.json')) {
        child.kill(15);
        process.exit(0);
    }

    if(`${data}`.includes('Server will restart in ~10 seconds') || `${data}`.includes('Failed to start the minecraft server') || `${data}`.endsWith('Exception stopping the server')) {
        child.kill(9);
        process.exit(1);
    }
});

child.stderr.on('data', (data) => {
    process.stdout.write(`${data}`);
});
