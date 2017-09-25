process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

// names obj to store a list of all the names
let names = {};
let numAdd = 1;

function main() {
    // number of ops
    const n = parseInt(readLine());
    for(let a0 = 0; a0 < n; a0++){
        // getting the op + string
        let op_temp = readLine().split(' ');
        // the op
        let op = op_temp[0];
        // the string
        let contact = op_temp[1];
        function runAlgo(op, contact) {
            const operations = {
                "add" : (contact) => {
                    names[numAdd] = contact;
                    numAdd++;
                },
                "find" : (contact) => {
                    let count = 0;
                    for (const key of Object.keys(names)) {
                        if (names[key].includes(contact)) count++;
                    }
                    console.log(count);
                }
            };
            operations[op](contact);
        };
        runAlgo(op, contact);
    }
}