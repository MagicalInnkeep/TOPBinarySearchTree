// Balanced Binary Search Tree 

//Node
class Node {
    constructor(data){
        this.data   =   data;
        this.left   =   null;
        this.right  =   null;
    }
}

//Tree --purposely written without recursion.
export class Tree {
    constructor(data){
        this.root = this.buildTree(data);
    }

    buildTree(array){
        const arr = this.preprocess(array);
        //https://www.geeksforgeeks.org/sorted-array-to-balanced-bst/
        let n = arr.length;

        if (n === 0)
            return null;

        // Create the root node
        let mid = Math.floor((n - 1) / 2);
        let root = new Node(arr[mid]);

        let q = [ {node : root, range : [ 0, n - 1 ]} ];
        let frontIndex = 0;

        while (frontIndex < q.length) {
            let front = q[frontIndex];
            let curr = front.node;
            let [s, e] = front.range;
            let index = s + Math.floor((e - s) / 2);

            // If left subtree exists
            if (s < index) {
                let midLeft
                    = s + Math.floor((index - 1 - s) / 2);
                let left = new Node(arr[midLeft]);
                curr.left = left;
                q.push({node : left, range : [ s, index - 1 ]});
            }

            // If right subtree exists
            if (e > index) {
                let midRight
                    = index + 1
                    + Math.floor((e - index - 1) / 2);
                let right = new Node(arr[midRight]);
                curr.right = right;
                q.push(
                    {node : right, range : [ index + 1, e ]});
            }

            frontIndex++;
        }

        return root;
    }

    //Preprocess Sorts and removes duplicates
    preprocess(array){
        //https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
        return array.sort(function(a, b){return a-b}).filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
        });

    }

    //Pretty print function copied and modified
    prettyPrint(node, prefix = "", isLeft = true){

            if (node === null) {
              return;
            }
            if (node.right !== null) {
              this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
            }
            console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
            if (node.left !== null) {
              this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
            }
    }

    //Pretty print for the whole tree.
    logPrettyPrint(){
       this.prettyPrint(this.root);
    }

    //Allows inserts of leafs. Unbalances the tree
    insert(value){
        const temp = new Node(value);
        
        // If tree is empty
        if (this.root === null)
            return temp;
    
        // Find the node who is going to have
        // the new node temp as its child
        let parent = null;
        let curr = this.root;
        while (curr !== null) {
            parent = curr;
            if (curr.data > value)
                curr = curr.left;
            else if (curr.data < value)
                curr = curr.right;
            else
                return this.root; // Value already exists
        }
    
        // If value is smaller, make it left
        // child, else right child
        if (parent.data > value)
            parent.left = temp;
        else
            parent.right = temp;
    
        return this.root;
    }

    //Deletes nodes from the tree. 
    delete(value){
        let curr = this.root;
        let prev = null;

        // Check if the data is actually present in the BST.
        // The variable prev points to the parent of the data
        // to be deleted.
        while (curr !== null && curr.data !== value) {
            prev = curr;
            if (value < curr.data) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }

        // data not present
        if (curr === null) {
            return this.root;
        }

        // Check if the node to be deleted has at most one child.
        if (curr.left === null || curr.right === null) {
            let newCurr = (curr.left === null) ? curr.right : curr.left;

            // Check if the node to be deleted is the root.
            if (prev === null) {
                return newCurr;
            }

            // Check if the node to be deleted is prev's left or
            // right child and then replace this with newCurr.
            if (curr === prev.left) {
                prev.left = newCurr;
            } else {
                prev.right = newCurr;
            }
            
        } else {
            // Node to be deleted has two children.
            let p = null;
            let temp = curr.right;
            while (temp.left !== null) {
                p = temp;
                temp = temp.left;
            }

            if (p !== null) {
                p.left = temp.right;
            } else {
                curr.right = temp.right;
            }

            curr.data = temp.data;
        }

        return this.root;
    }

    //Returns the BST from the searched node.
    find(value){
        let curr = this.root;
        let prev = null;

        // Check if the data is actually present in the BST.
        while (curr !== null && curr.data !== value) {
            prev = curr;
            if (value < curr.data) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }
        
        return curr;
    }

    //Breadth-first level order traversal
    levelOrder(callback){

        if(!callback){
            throw new Error("No callback function provided.");
        }

        try{
            let queue = [];
            queue.push(this.root);

            while(queue[0] !== undefined && queue[0] !== null){
                let curr =queue[0]
                callback(curr.data);
                if(curr.left !== null){queue.push(curr.left);}
                if(curr.right !== null){queue.push(curr.right);}
                queue.shift();
            }
        }
        catch(e){
            console.error(e);
        }
    }
    //Depth-first traversal
    inOrder(callback){

        if(!callback){
            throw new Error("No callback function provided.");
        }

        try{
            let s = [];
            let curr = this.root;

            while (curr !== null || s.length > 0) {

                // Reach the left most Node of the curr Node
                while (curr !== null) {

                    // Place pointer to a tree node on
                    // the stack before traversing
                    // the node's left subtree
                    s.push(curr);
                    curr = curr.left;
                }

                // Current must be NULL at this point
                curr = s.pop();
                callback(curr.data);

                // we have visited the node and its
                // left subtree. Now, it's right
                // subtree's turn
                curr = curr.right;

            }

        }

        catch(e){
            console.error(e);
        }
    }

    preOrder(callback){
        if(!callback){
            throw new Error("No callback function provided.");
        }

        try{
            let s = [];
            let curr = this.root;

            while (curr !== null || s.length > 0) {

                // Reach the left most Node of the curr Node
                while (curr !== null) {

                    // Place pointer to a tree node on
                    // the stack before traversing
                    // the node's left subtree
                    callback(curr.data);
                    s.push(curr);
                    curr = curr.left;
                }

                // Current must be NULL at this point
                curr = s.pop();
                
                // we have visited the node and its
                // left subtree. Now, it's right
                // subtree's turn
                curr = curr.right;

            }

        }
        catch(e){
            console.error(e);
        }
    } 

    postOrder(callback){
        if(!callback){
            throw new Error("No callback function provided.");
        }

        try{
            let s1 = []; // preorder
            let s2 = []; // postorder
            let curr = this.root;
    
            if (curr !== null) {
                s1.push(curr);
            }
    
            while (s1.length > 0) {
                curr = s1.pop();
                s2.push(curr);
    
                if (curr.left !== null) {
                    s1.push(curr.left);
                }
    
                if (curr.right !== null) {
                    s1.push(curr.right);
                }
            }
    
            while (s2.length > 0) {
                curr = s2.pop();
                callback(curr.data);
            }

        }

        catch(e){
            console.error(e);
        }
    }
    
    //Max amount of nodes till leaf
    height(node){
        let newNode = this.find(node);
        let curr = newNode;
        let hgtValue = 0;
        let maxValue = 0;
        let queue = [];

        queue.push(newNode);

        while(queue[0] !== undefined && queue[0] !== null){
            let curr =queue[0]
            hgtValue++;
            if(curr.left == null && curr.right == null) {
                maxValue = maxValue<=hgtValue? hgtValue : maxValue;
                hgtValue--;
            } 
            if(curr.left !== null){queue.push(curr.left);}
            if(curr.right !== null){queue.push(curr.right);}
            queue.shift();
        }


        return curr!==null ? hgtValue : null;
    }

    //Amount of nodes till root
    depth(node){}


}

