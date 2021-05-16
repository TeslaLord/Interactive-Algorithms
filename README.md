# Interactive-Algorithms

## About

This project is used to find shortest path between various given node with two approaches - Dijkstra and bellman-ford
The input requirements are number of nodes, source and destination nodes and relationship between nodes. 
Source node is red in color, destination node is in green. The nodes and edges are interactive. They can dragged, highlighted. You can zoom in or out.
You can view three different types of output. 
1. Standard output which displays distance between the nodes
2. Distance from source node to every other node
3. Path from source node to destination note


Dijkstra algorithm is an efficient shortest path algorithm for positive edges. Dijkstra doesn't perform well on negative weights as it uses greedy approach.
Bellman-ford can work efficiently on negative edges, unless there are negative edge cycles.

## Sample Input

Source node: 1
Destination node: 5
Weights, Copy and paste this: 
1,2,10
2,3,5
3,4,9
1,4,15
2,5,13
3,5,20

<img src="interactive1.png">
<img src="interactive2.png">
<img src="interactive3.png">
