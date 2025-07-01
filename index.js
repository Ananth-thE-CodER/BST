import { BinaryTree } from "./tree.js";

let data = [50, 30, 20, 40, 41, 34, 36, 70, 60, 65, 80, 75, 85];

const tree = new BinaryTree(data);

tree.prettyPrint(tree.root);

tree.insert(5);
 
console.log("============ INSERT 5 ============")

tree.prettyPrint(tree.root);

console.log("============ DELETE 34 ===========")

tree.deleteItem(34);

tree.prettyPrint(tree.root);

console.log("============ DELETE 20 ===========")

tree.deleteItem(20);

tree.prettyPrint(tree.root);

console.log("============ DELETE 75, 40, 41 ===========")

tree.deleteItem(75);
tree.deleteItem(40);
tree.deleteItem(41);

tree.prettyPrint(tree.root);

console.log("============ Find 40 and 100 ===========")

console.log(tree.find(40));

console.log(tree.find(100));

console.log("============ Level order traversal with printing each node's value ===========")

tree.levelOrder((node) => console.log(node.value));

console.log("============ Preorder traversal with printing each node's value ===========")

tree.preOrder((node) => console.log(node.value));

console.log("============ Inorder traversal with printing each node's value ===========")

tree.inOrder((node) => console.log(node.value));

console.log("============ Postorder traversal with printing each node's value ===========")

tree.postOrder((node) => console.log(node.value));

console.log("============ Height ===========")

console.log(tree.height(36));

console.log("============ Depth ===========")

console.log(tree.depth(30));

console.log("============ isBalanced ===========")

console.log(tree.isBalanced());

console.log("============ reBalance ===========")

tree.rebalance();

tree.prettyPrint(tree.root);

console.log("Is Balanced?: ", tree.isBalanced());


