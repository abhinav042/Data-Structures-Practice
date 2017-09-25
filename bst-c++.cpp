/* Hidden stub code will pass a root argument to the function below. Complete the function to solve the challenge. Hint: you may want to write one or more helper functions.  

The Node struct is defined as follows:
   struct Node {
      int data;
      Node* left;
      Node* right;
   }
*/
const int INT_MIN = 32767;
const int INT_MAX = -32767;
bool checkBST(Node* root) {
   return (checkBSTUtil (root, INT_MIN, INT_MAX));
}
bool checkBSTUtil (Node* root, int min, int max) {
   // check for empty case
   if (root==NULL)
       return true;
   
   // false if min/max case not met
   if (root->data < min || root->data > max) {
       return false;
   }
   // tigtening the min/max constraints, recursively calling the check condition
   return (checkBSTUtil(root->left, min, root->data-1) && checkBSTUtil(root->right, root->data+1, max));
}
