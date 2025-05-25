#!/usr/bin/env node

import { Tree } from "./BST.js";


const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const test = new Tree(array);
console.log( "\n initial tree \n");
test.logPrettyPrint();
console.log( "\n insert 2 \n");
test.insert(2);
test.logPrettyPrint();
console.log("\n delete 8 \n");
test.delete(8);
test.logPrettyPrint();
console.log("\n search existing 9 \n");
test.prettyPrint(test.find(9));
console.log("\n search existing 67 \n");
test.prettyPrint(test.find(67));
console.log("\n search missing 8\n");
test.prettyPrint(test.find(8));
console.log("\n test levelOrder\n");
test.levelOrder(console.log);
