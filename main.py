def find_lowest_cost_node(costs):
    lowest_cost = float("inf")
    lowest_cost_node = None
    for node in costs:
        cost = costs[node]
        if cost < lowest_cost and node not in processed:
            lowest_cost = cost
            lowest_cost_node = node
    return lowest_cost_node


# graph = {}
# graph["start"] = {}
# graph["start"]["a"] = 6
# graph["start"]["b"] = 2
# graph["a"] = {}
# graph["b"] = {}
# graph["b"]["a"] = 3
# graph["a"]["fin"] = 1
# graph["fin"] = {}
# print(len(graph))

# infinity = float("inf")
# costs = {}
# costs["a"] = 6
# costs["b"] = 2
# costs["fin"] = infinity


# parents = {}
# parents["a"] = "start"
# parents["b"] = "start"
# parents["fin"] = None
# processed = []


graph = {}
print("Enter the nodes: ")
l = list(map(str, input().split()))
for i in l:
    graph[i] = {}

a = input()
neighbor_start = []
infinity = float("inf")
costs = {}
parents = {}
processed = []
while a != 'exit':
    start, end, cost = a.split(' ')
    graph[start][end] = int(cost)
    if start == l[0]:
        neighbor_start.append(end)
        costs[end] = int(cost)
        parents[end] = l[0]
    a = input()
difference = set(l) - set(neighbor_start)

for i in difference:
    if i != l[0]:
        costs[i] = infinity
        parents[i] = None
print(costs)
node = find_lowest_cost_node(costs)


while node is not None:
    cost = costs[node]
    neighbors = graph[node]
    for n in neighbors.keys():
        new_cost = cost + neighbors[n]
        if costs[n] > new_cost:
            costs[n] = new_cost
            parents[n] = node
    processed.append(node)
    node = find_lowest_cost_node(costs)
print("Vertex             Distance from source")
d = {k: v for k, v in sorted(costs.items(), key=lambda item: item[0])}

for k, v in d.items():
    print(k, "                   ", v)
