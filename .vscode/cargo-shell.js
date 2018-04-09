var ChildProcess = require('child_process');

var task = process.argv[2];

var cargo = ChildProcess.exec('cargo ' + task);

cargo.stdout.on('data', function (data) {
    process.stdout.write(data);
});

cargo.stderr.on('data', function (data) {
    var lines = data
        .split(/\n\s*/)
        .map(function (line, index) {
            if (!line || (index && /^[^:]+\.rs:/.test(line))) {
                return '\n' + line;
            } else {
                return line;
            }
        });
        
    data = lines.join(' ');
    process.stderr.write(data);
});

cargo.on('error', function (error) {
    process.exit(1);
});