onload = function () {
    const container = document.getElementById('container');
    const container2 = document.getElementById('container2');
    const genNew = document.getElementById('generate-graph');
    const out1 = document.getElementById('out-1');
    const out2 = document.getElementById('out-2');
    const out3 = document.getElementById('out-3');

    const options = {
        edges: {
            arrows: {
                to: true
            },
            labelHighlightBold: true,
            font: {
                size: 20
            }
        },
        nodes: {
            font: '12px arial red',
            scaling: {
                label: true
            },
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf015',
                size: 40,
                color: "black"
            }
        }
    }

    const network = new vis.Network(container);
    const network2 = new vis.Network(container2);
    network.setOptions(options);
    network2.setOptions(options);




    function createData() {
        //the vertices info input to vis.jb library
        var x = document.getElementById("frm1");
        let conn = x.elements[0].value;
        let V = parseInt(document.getElementById("nodenum").value)
        starting_node = parseInt(document.getElementById("startingnode").value)
        ending_node = parseInt(document.getElementById("endingnode").value)
        var splitconn = conn.split("\n")

        let vertices = []
        for (let i = 1; i < V + 1; i++) {
            if (i != starting_node && i != ending_node) {
                vertices.push({
                    id: i,
                    label: "person " + (i),

                })
            } else if (i == starting_node) {
                vertices.push({
                    id: i,
                    label: "person " + (i),
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf015',
                        size: 40,
                        color: "green"
                    }
                })
            } else if (i == ending_node) {
                vertices.push({
                    id: i,
                    label: "person " + (i),
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf015',
                        size: 40,
                        color: "red"
                    }
                })
            }
        }

        let edges = []
        i = ""
        for (i in splitconn) {
            let splitvalues = splitconn[i].split(",")
            edges.push({
                from: splitvalues[0],
                to: splitvalues[1],
                color: 'green',
                label: String(splitvalues[2])
            })
        }
        const data = {
            nodes: vertices,
            edges: edges
        }
        return data;
    }

    function find_lowest_cost_node(costs) {

        let lowest_cost = Infinity
        let lowest_cost_node = null

        for (var node in costs) {
            cost = costs[node]
            if (((cost) < (lowest_cost)) && !(processed.includes(node))) {
                lowest_cost = parseInt(cost)
                lowest_cost_node = node
            }
        }
        return lowest_cost_node;
    }



    function solveData() {
        vertices = []
        edges = []
        var x = document.getElementById("frm1");
        V = parseInt(document.getElementById("nodenum").value)
        let conn = x.elements[0].value;
        var splitconn = conn.split("\n")
        graph = {}
        for (let i = 1; i <= V; i++) {
            graph[i] = {}
            if (i != starting_node && i != ending_node)
                vertices.push({
                    id: i,
                    label: "person " + (i),
                })
            if (i == starting_node)
                vertices.push({
                    id: i,
                    label: "person " + (i),
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf015',
                        size: 40,
                        color: "red"
                    }
                })
            if (i == ending_node)
                vertices.push({
                    id: i,
                    label: "person " + (i),
                    icon: {
                        face: 'FontAwesome',
                        code: '\uf015',
                        size: 40,
                        color: "green"
                    }
                })
        }
        V = Math.round(V) + 1
        let l = [...Array(V).keys()]; //Doubt
        // let l = [1, 2, 3, 4]
        delete l[0]
        let neighbor_start = []
        costs = {}
        parents = {}
        processed = []
        let i = ""
        for (i in splitconn) {
            let splitvalues = splitconn[i].split(",")
            let start = parseInt(splitvalues[0])
            let end = parseInt(splitvalues[1])

            let cost_edge = parseInt(splitvalues[2])
            if (!Number.isNaN(start)) {
                graph[start][end] = parseInt(cost_edge)
                if (start == starting_node) {
                    neighbor_start.push(end)
                    costs[end] = parseInt(cost_edge)
                    parents[end] = starting_node
                }
            }
        }
        const l_set = [...new Set(l)];
        const neighbor_start_set = [...new Set(neighbor_start)];
        let difference = new Set([...l_set].filter(x => !neighbor_start_set.includes(x)));

        difference = Array.from(difference);
        for (var k in difference) {

            if (parseInt(difference[k]) != starting_node) {

                costs[difference[k]] = Infinity
                parents[difference[k]] = null;
            }
        }

        let node = find_lowest_cost_node(costs)

        while (node != null) {
            cost = costs[node]
            neighbors = graph[node]
            for (var n in neighbors) {
                new_cost = (cost) + (neighbors[n])
                new_cost = (new_cost)
                if ((costs[n]) > (new_cost)) {
                    costs[n] = new_cost
                    parents[n] = parseInt(node)
                }
            }
            processed.push(node)
            node = find_lowest_cost_node(costs)
        }
    }

    function output1() {
        solveData()
        let temp = []
        for (let i = 1; i < V + 1; i++) {
            if (parents[i] == null && i != starting_node) {
                temp.push(i)
            }
            edges.push({
                from: parents[i],
                to: i,
                color: 'green',
                label: String(costs[i])
            })
        }

        let l = [...Array(V).keys()];
        delete l[0]
        for (let i = 1; i < V + 1; i++) {
            edges.push({
                from: starting_node,
                to: temp[i - 1],
                color: 'green',
                label: String(Infinity)
            })

        }
        const data = {
            nodes: vertices,
            edges: edges
        }
        return data;
    }

    function output2() {
        solveData()
        for (var n in costs) {
            edges.push({
                from: starting_node,
                to: n,
                color: 'green',
                label: String(costs[n])
            })
        }
        const data = {
            nodes: vertices,
            edges: edges
        }
        return data;
    }

    function output3() {
        solveData()
        let end = ending_node
        let vertices = []
        let edges = []
        if (parents[end] == null) {
            vertices.push({
                id: end,
                label: "person " + (end),

            }, {
                id: starting_node,
                label: "person " + (starting_node),

            })
            edges.push({
                from: starting_node,
                to: end,
                color: 'green',
                label: String(Infinity)
            })
        } else {
            while (end != starting_node && (end in parents)) {
                edges.push({
                    from: parents[end],
                    to: end,
                    color: 'green',
                    label: String(costs[end])
                })
                vertices.push({
                    id: end,
                    label: "person " + (end)
                })
                end = parents[end]
            }
            vertices.push({
                id: end,
                label: "person " + (end)
            })
        }
        const data = {
            nodes: vertices,
            edges: edges
        }
        return data;
    }
    genNew.onclick = function () {
        //Creating and setting date to network
        let data = createData();
        network.setData(data);
    }
    out1.onclick = function () {
        let data = output1();
        network2.setData(data);
    }
    out2.onclick = function () {

        let data = output2();
        network2.setData(data);
    }
    out3.onclick = function () {
        let data = output3();
        network2.setData(data);
    }

}
