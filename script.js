onload = function () {
    const container = document.getElementById('container');
    const container2 = document.getElementById('container2');
    const genNew = document.getElementById('generate-graph');
    const solveNew = document.getElementById('solve-graph');

    const options = {
        edges: {
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
                color: "#991133"
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
        let V = x.elements[0].value;
        let conn = x.elements[1].value;
        var splitconn = conn.split("\n")

        let vertices = []
        for (let i = 0; i < V; i++) {
            vertices.push({
                id: i + 1,
                label: "person " + (i + 1)
            })
        }

        let edges = []
        i = ""
        for (i in splitconn) {
            let splitvalues = splitconn[i].split(" ")
            edges.push({
                from: splitvalues[0],
                to: splitvalues[1],
                color: 'orange',
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
        let vertices = []
        let edges = []
        var x = document.getElementById("frm1");
        let V = x.elements[0].value;
        let conn = x.elements[1].value;
        var splitconn = conn.split("\n")
        graph = {}
        for (let i = 1; i <= V; i++) {
            graph[i] = {}
            vertices.push({
                id: i,
                label: "person " + (i)
            })
        }
        V = Math.round(V) + 1
        let l = [...Array(V).keys()]; //Doubt
        // let l = [1, 2, 3, 4]
        delete l[0]
        let neighbor_start = []
        let costs = {}
        parents = {}
        processed = []
        let i = ""
        for (i in splitconn) {
            let splitvalues = splitconn[i].split(" ")
            let start = parseInt(splitvalues[0])
            let end = parseInt(splitvalues[1])

            let cost_edge = parseInt(splitvalues[2])
            if (!Number.isNaN(start)) {
                console.log(start, end, cost_edge)
                graph[start][end] = parseInt(cost_edge)
                if (start == 1) {
                    neighbor_start.push(end)
                    costs[end] = parseInt(cost_edge)
                    parents[end] = 1
                }
            }
        }
        const l_set = [...new Set(l)];
        const neighbor_start_set = [...new Set(neighbor_start)];
        let difference = new Set([...l_set].filter(x => !neighbor_start_set.includes(x)));

        difference = Array.from(difference);
        for (var k in difference) {

            if (parseInt(difference[k]) != 1) {

                costs[difference[k]] = Infinity
                parents[difference[k]] = null;
            }
        }
        console.log(costs)
        let node = find_lowest_cost_node(costs)

        while (node != null) {
            cost = costs[node]
            neighbors = graph[node]
            for (var n in neighbors) {
                new_cost = (cost) + (neighbors[n])
                new_cost = (new_cost)
                if ((costs[n]) > (new_cost)) {
                    costs[n] = new_cost
                    parents[n] = node
                }
            }
            processed.push(node)
            node = find_lowest_cost_node(costs)
        }
        for (var n in costs) {
            edges.push({
                from: 1,
                to: n,
                color: 'orange',
                label: String(costs[n])
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
    solveNew.onclick = function () {
        let data = solveData();
        network2.setData(data);
    }

}