#!/usr/bin/env node

import { Tree } from "./BST.js";


const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const test = new Tree(array);
console.log( "\n initial tree \n");
test.logPrettyPrint();
console.log("\n isBalanced? \n");
console.log(test.isBalanced());
console.log( "\n insert 2 \n");
test.insert(2);
test.logPrettyPrint();
console.log("\n isBalanced? \n");
console.log(test.isBalanced());
console.log("\n rebalance \n");
test.rebalance();
test.logPrettyPrint();
console.log("\n isBalanced? \n");
console.log(test.isBalanced());
// console.log("\n delete 8 \n");
// test.delete(8);
// test.logPrettyPrint();
// console.log("\n search existing 9 \n");
// test.prettyPrint(test.find(9));
// console.log("\n search existing 67 \n");
// test.prettyPrint(test.find(67));
// console.log("\n search missing 8\n");
// test.prettyPrint(test.find(8));
// console.log("\n test levelOrder\n");
// test.levelOrder(console.log);
// console.log("\n test inOrder\n");
// test.inOrder(console.log);
// console.log("\n test preOrder\n");
// test.preOrder(console.log);
// console.log("\n test postOrder\n");
// test.postOrder(console.log);
// console.log("\n test height\n");
// console.log(test.height(9));
// console.log("\n test height\n");
// console.log(test.height(67));
// console.log("\n test height\n");
// console.log(test.height(8));
// console.log("\n test depth\n");
// console.log(test.depth(8));
// console.log("\n test depth\n");
// console.log(test.depth(67));
