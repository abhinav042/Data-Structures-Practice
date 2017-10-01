/////////////// input stuff ////////////////////

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

// Defining a node
let Node = function() {
    this.keys = new Map();
    this.end = false;
    this.setEnd = function() {
        this.end = true;
    };
    this.isEnd = function() {
        return this.end;
    };
};

// implementing trie data structure
let Trie = function() {
    // defining root node
    this.root = new Node();
    // add function for inserting a word
    this.add = function(input, node = this.root) {
        if (input.length === 0) {
            node.setEnd();
            return;
        } else if (!node.keys.has(input[0])) {
            node.keys.set(input[0], new Node());
            return this.add(input.substr(1), node.keys.get(input[0]));
        } else {
            return this.add(input.substr(1), node.keys.get(input[0]));
        }
    }
    // counting words starting from the input
    this.count = function(input) {
        let words = new Array();
        let node = this.root;
        while(input.length > 0) {
            if(node.keys.has(input[0])) {
                node = node.keys.get(input[0]);
                input = input.substr(1);
            } else {
                return 0;
            };
        };
        let search = function(node, string) {
            if(node.keys.size != 0) {
                for(let letter of node.keys.keys()) {
                    search(node.keys.get(letter), string.concat(letter));
                };
                if (node.isEnd()) {
                    words.push(string);
                };
            } else {
                string.length > 0 ? words.push(string) : undefined;
                return;
            };
        };
        search(node, new String());
        return words.length;
    };   
    // helper print function
    this.print = function() {
        let words = new Array();
        let search = function(node, string) {
            if (node.keys.size != 0) {
                for (let letter of node.keys.keys()) {
                    search(node.keys.get(letter), string.concat(letter));
                };
                if (node.isEnd()) {
                    words.push(string);
                };
            } else {
                string.length > 0 ? words.push(string) : undefined;
                return;
            };
        };
        search(this.root, new String());
        return words.length > 0 ? words : null;
    };
};

function main() {

    // number of ops
    const n = parseInt(readLine());
    const trie = new Trie();
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
                    /* inefficient implementation */
                    // names[numAdd] = contact;
                    // numAdd++;
    
                    trie.add(contact);
                },
                "find" : (contact) => {
                    /* inefficient implementation */
                    // let count = 0;               
                    // countArr = names.filter((name)=> {
                    //     return name.startsWith(contact);
                    // });
                    
                    console.log(trie.count(contact));
                }
            };
            operations[op](contact);
        };   
        runAlgo(op, contact);
    }
}
