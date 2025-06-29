import { Node } from "./node.js";
import { MergeSort } from "./sort.js";

export class BinaryTree {
    constructor(dataArr) {
        this.arr = this.getSortedArray(dataArr);
        this.root = this.buildTree(this.arr);
    }

    buildTree(array) {
        let arr = [...new Set(array)];
        let start = 0;
        let end = arr.length;

        if (start == end) return null;

        let mid = start + Math.floor((end - start) / 2);

        let root = new Node(arr[mid]);

        root.left = this.buildTree(arr.slice(0, mid));
        root.right = this.buildTree(arr.slice(mid + 1, end));

        return root;
    }

    prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    getSortedArray(array) {
        const merge = new MergeSort();
        return merge.sort(array);
    }

    insert(value) {
        let node = new Node(value);
        this._insert(node, this.root);
    }

    _insert(node, currRoot) {
        if (node.value < currRoot.value) {
            if (!currRoot.left) {
                currRoot.left = node;
                return;
            }
            this._insert(node, currRoot.left);
        }
        if (node.value > currRoot.value) {
            if (!currRoot.right) { 
                currRoot.right = node;
                return;
            }
            this._insert(node, currRoot.right);
        }
    }

    deleteItem(value) {
        this._deleteItem(value, this.root, null);
    }

    _deleteItem(value, currRoot=null, parentPointer=null) {
        if (value == currRoot.value && !currRoot.left && !currRoot.right) { // Case 1: leaf node
            if (value < parentPointer.value) {
                parentPointer.left = null;
                return;
            }
            if (value > parentPointer.value) {
                parentPointer.right = null;
                return;
            }  
        }
        if (value == currRoot.value && ((currRoot.left && !currRoot.right) || (!currRoot.left && currRoot.right))) { // When node has only 1 child.
            if (currRoot.left && !currRoot.right) {
                parentPointer.left = currRoot.left;
                return;
            }
            if (!currRoot.left && currRoot.right) {
                parentPointer.right = currRoot.right;
                return;
            }
        }
        if (value == currRoot.value && (currRoot.left && currRoot.right)) { // Case 3: Node has both left and right children
            let subChild = currRoot.right;
            let subParent = null;
            while (subChild && subChild.left) {
                subParent = subChild;
                subChild = subChild.left;
            }
            currRoot.value = subChild.value;
            subParent.left = null;
            return;
        }
        if (value < currRoot.value) {
            this._deleteItem(value, currRoot.left, parentPointer=currRoot);
        }
        if (value > currRoot.value) {
            this._deleteItem(value, currRoot.right, parentPointer=currRoot);
        }
    }

    find(value) {
        return this._find(value, this.root);
    }

    _find(value, currNode=null) {
        if (currNode == null) {
            return currNode;
        }
        if (value == currNode.value) {
            return currNode;
        }
        else {
            if (value < currNode.value) {
                return this._find(value, currNode.left);
            }
            else if (value > currNode.value) {
                return this._find(value, currNode.right);
            }
        }
    }

    levelOrder(callback) {
        if (!callback) return Error("Please provide a callback function.");

        let queue = [];

        if (!this.root) return null;

        queue.push(this.root);

        while(queue.length) {
            let currNode = queue.shift();
            callback(currNode);
            if (currNode.left) queue.push(currNode.left);
            if (currNode.right) queue.push(currNode.right);
        }
    }

    preOrder(callback) {
        this._preOrder(callback, this.root);
    }

    _preOrder(callback, currNode) {
        if (!callback) return Error("Please provide a callback function.");
        if (!currNode) return null;
        callback(currNode);
        this._preOrder(callback, currNode.left);
        this._preOrder(callback, currNode.right);
    }

    inOrder(callback) {
        this._inOrder(callback, this.root);
    }

    _inOrder(callback, currNode) {
        if (!callback) return Error("Please provide a callback function.");
        if (!currNode) return null;
        this._inOrder(callback, currNode.left);
        callback(currNode);
        this._inOrder(callback, currNode.right);
    }

    postOrder(callback) {
        this._postOrder(callback, this.root);
    }

    _postOrder(callback, currNode) {
        if (!callback) return Error("Please provide a callback function.");
        if (!currNode) return null;
        this._postOrder(callback, currNode.left);
        this._postOrder(callback, currNode.right);
        callback(currNode);
    }

    height(value) {
        let node = this.find(value);
        if (!node) return null;
        return this._height(node);
    }

    _height(node) {
        if (!node) return -1;
        let leftHeight = this._height(node.left);
        let rightHeight = this._height(node.right);
        return 1 + Math.max(leftHeight, rightHeight);
    }

    depth(value) {
        let node = this.find(value);
        if (!node) return null;
        return this._depth(node, this.root);
    }

    _depth(node, currNode, height=0) {
        if (node.value == currNode.value) return height;
        if (node.value < currNode.value) {
            height++;
            return this._depth(node, currNode.left, height);
        };
        if (node.value > currNode.value) {
            height++;
            return this._depth(node, currNode.right, height);
        };
    }

    _leftSubTreeHeight(node) {
        if (node.left) {
            return 1 + this.height(node.left.value);
        }
        else {
            return 0;
        }
    }

    _rightSubTreeHeight(node) {
        if (node.right) {
            return 1 + this.height(node.right.value);
        }
        else {
            return 0;
        }
    }

    isBalanced() {
        return this.postOrder((node) => {
            let leftHeight = this._leftSubTreeHeight(node);
            let rightHeight = this._rightSubTreeHeight(node);
            
            if (Math.abs(leftHeight - rightHeight) > 1) {
                return false;
            }
        }) ? true : false
    }
}