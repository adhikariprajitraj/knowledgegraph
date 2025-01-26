document.addEventListener('DOMContentLoaded', () => {
    // Define nodes and edges
    const nodes = new vis.DataSet([
        { id: 1, label: 'Introduction to OR', group: 'foundation' },
        { id: 2, label: 'Mathematical Foundations', group: 'foundation' },
        { id: 3, label: 'Linear Programming', group: 'optimization' },
        { id: 4, label: 'Integer Programming', group: 'optimization' },
        { id: 5, label: 'Nonlinear Programming', group: 'optimization' },
        { id: 6, label: 'Dynamic Programming', group: 'optimization' },
        { id: 7, label: 'Simulation', group: 'application' },
        { id: 8, label: 'Decision Analysis', group: 'application' },
        { id: 9, label: 'Stochastic Processes', group: 'application' },
        { id: 10, label: 'Advanced Topics', group: 'application' },
        { id: 11, label: 'Software Tools', group: 'application' },
        { id: 12, label: 'Case Studies', group: 'application' }
    ]);

    const edges = new vis.DataSet([
        { from: 1, to: 2 },
        { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 5 }, { from: 2, to: 6 },
        { from: 3, to: 7 }, { from: 3, to: 8 }, { from: 3, to: 11 },
        { from: 4, to: 7 }, { from: 4, to: 12 },
        { from: 5, to: 9 }, { from: 5, to: 10 },
        { from: 6, to: 8 }, { from: 6, to: 9 },
        { from: 7, to: 12 }, { from: 8, to: 12 }, { from: 9, to: 12 }, { from: 10, to: 12 }
    ]);

    // Configure network
    const container = document.getElementById('network-container');
    const data = { nodes, edges };

    const options = {
        nodes: {
            shape: 'box',
            margin: 10,
            widthConstraint: { maximum: 150 },
            font: { size: 14 }
        },
        edges: {
            arrows: 'to',
            smooth: { type: 'cubicBezier' }
        },
        layout: {
            hierarchical: {
                direction: 'LR',
                sortMethod: 'directed'
            }
        },
        physics: false
    };

    // Initialize network
    const network = new vis.Network(container, data, options);

    // Filter functionality
    document.querySelectorAll('.category-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateFilters);
    });

    document.getElementById('reset-filters').addEventListener('click', () => {
        document.querySelectorAll('.category-checkbox').forEach(checkbox => {
            checkbox.checked = true;
        });
        updateFilters();
    });

    function updateFilters() {
        const visibleGroups = Array.from(document.querySelectorAll('.category-checkbox:checked'))
            .map(checkbox => checkbox.value);

        const visibleNodes = nodes.get({
            filter: node => visibleGroups.includes(node.group)
        }).map(node => node.id);

        nodes.update(nodes.get().map(node => ({
            id: node.id,
            hidden: !visibleGroups.includes(node.group)
        })));

        network.fit({ nodes: visibleNodes });
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        network.fit();
    });

    // Reset functionality
    document.getElementById('reset-filters').addEventListener('click', function() {
        nodes.clear();
        edges.clear();

        nodes.add([
            { id: 1, label: 'Introduction to OR', group: 'foundation' },
            { id: 2, label: 'Mathematical Foundations', group: 'foundation' },
            { id: 3, label: 'Linear Programming', group: 'optimization' },
            { id: 4, label: 'Integer Programming', group: 'optimization' },
            { id: 5, label: 'Nonlinear Programming', group: 'optimization' },
            { id: 6, label: 'Dynamic Programming', group: 'optimization' },
            { id: 7, label: 'Simulation', group: 'application' },
            { id: 8, label: 'Decision Analysis', group: 'application' },
            { id: 9, label: 'Stochastic Processes', group: 'application' },
            { id: 10, label: 'Advanced Topics', group: 'application' },
            { id: 11, label: 'Software Tools', group: 'application' },
            { id: 12, label: 'Case Studies', group: 'application' }
        ]);

        edges.add([
            { from: 1, to: 2 },
            { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 5 }, { from: 2, to: 6 },
            { from: 3, to: 7 }, { from: 3, to: 8 }, { from: 3, to: 11 },
            { from: 4, to: 7 }, { from: 4, to: 12 },
            { from: 5, to: 9 }, { from: 5, to: 10 },
            { from: 6, to: 8 }, { from: 6, to: 9 },
            { from: 7, to: 12 }, { from: 8, to: 12 }, { from: 9, to: 12 }, { from: 10, to: 12 }
        ]);

        network.fit();
    });
});