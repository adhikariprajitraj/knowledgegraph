document.addEventListener('DOMContentLoaded', () => {
    // Add loading state
    const loading = document.getElementById('loading');
    loading.style.display = 'none'; // Hide loading by default

    try {
        loading.style.display = 'block'; // Show loading while initializing
        // Define expanded nodes and edges
        const nodes = new vis.DataSet([
            // Prerequisite Math Course at center
            { id: 0, label: 'Basic Mathematics', group: 'prerequisite', level: 0, y: 0 },
            
            // Foundation Layer - Adjusted positions
            { id: 1, label: 'Introduction to OR', group: 'foundation', level: 1, y: -200 },
            { id: 2, label: 'Mathematical Foundations', group: 'foundation', level: 1, y: 0 },
            { id: 13, label: 'Probability & Statistics', group: 'foundation', level: 1, y: 200 },
            
            // Split Optimization Layer into two columns
            { id: 3, label: 'Linear Programming', group: 'optimization', level: 2, y: -400 },
            { id: 4, label: 'Integer Programming', group: 'optimization', level: 2, y: -200 },
            { id: 5, label: 'Nonlinear Programming', group: 'optimization', level: 2, y: 0 },
            { id: 6, label: 'Dynamic Programming', group: 'optimization', level: 2, y: 200 },
            { id: 14, label: 'Multi-Objective Optimization', group: 'optimization', level: 2, y: 400 },
            { id: 15, label: 'Stochastic Programming', group: 'optimization', level: 2, y: 600 },
            
            // Application Layer - Split into two rows with more spacing
            { id: 7, label: 'Simulation', group: 'application', level: 3, y: -900 },
            { id: 8, label: 'Decision Analysis', group: 'application', level: 3, y: -500 },
            { id: 9, label: 'Stochastic Processes', group: 'application', level: 3, y: -100 },
            { id: 10, label: 'Advanced Topics', group: 'application', level: 3, y: 300 },
            { id: 11, label: 'Software Tools', group: 'application', level: 3.5, y: -700 },
            { id: 12, label: 'Case Studies', group: 'application', level: 3.5, y: -300 },
            { id: 16, label: 'Supply Chain Optimization', group: 'application', level: 3.5, y: 100 },
            { id: 17, label: 'Healthcare OR', group: 'application', level: 3.5, y: 500 },
            { id: 18, label: 'Energy Systems', group: 'application', level: 3.5, y: 900 }
        ]);

        const edges = new vis.DataSet([
            // Prerequisite connection
            { from: 0, to: 1 },
            
            // Foundation connections
            { from: 1, to: 2 }, { from: 1, to: 13 },
            { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 5 }, { from: 2, to: 6 },
            { from: 13, to: 9 }, { from: 13, to: 15 },
            
            // Optimization connections
            { from: 3, to: 7 }, { from: 3, to: 8 }, { from: 3, to: 11 },
            { from: 4, to: 7 }, { from: 4, to: 12 }, { from: 4, to: 16 },
            { from: 5, to: 9 }, { from: 5, to: 10 }, { from: 5, to: 14 },
            { from: 6, to: 8 }, { from: 6, to: 9 }, { from: 6, to: 17 },
            { from: 14, to: 10 }, { from: 15, to: 9 },
            
            // Application connections
            { from: 7, to: 12 }, { from: 8, to: 12 }, { from: 9, to: 12 }, 
            { from: 10, to: 12 }, { from: 16, to: 12 }, { from: 17, to: 12 },
            { from: 18, to: 12 }, { from: 11, to: 12 }
        ]);

        // Configure network with improved layout
        const container = document.getElementById('network-container');
        const data = { nodes, edges };

        const options = {
            nodes: {
                shape: 'box',
                margin: 45,        // Increased margin for text
                widthConstraint: { 
                    maximum: 300,  // Increased maximum width
                    minimum: 220   // Increased minimum width
                },
                heightConstraint: {
                    minimum: 50   // Increased height for better text fit
                },
                font: { 
                    size: 45,     // Increased font size
                    face: 'Roboto',
                    color: '#2c3e50',
                    bold: true
                },
                borderWidth: 2,
                color: {
                    border: '#3498db',
                    background: '#ffffff',
                    highlight: {
                        border: '#2c3e50',
                        background: '#f8f9fa'
                    }
                },
                shadow: true
            },
            edges: {
                arrows: 'to',
                smooth: { 
                    type: 'cubicBezier',
                    forceDirection: 'horizontal',  // Changed to horizontal
                    roundness: 0.8            // Reduced for straighter lines
                },
                color: {
                    color: '#95a5a6',
                    highlight: '#34495e'
                },
                width: 3  // Thicker edges
            },
            layout: {
                hierarchical: {
                    direction: 'LR',          // Changed to Left-Right
                    sortMethod: 'directed',
                    levelSeparation: 700,     // Increased level separation
                    nodeSpacing: 500,         // Increased node spacing
                    treeSpacing: 700,         // Increased tree spacing
                    blockShifting: true,
                    edgeMinimization: true,
                    parentCentralization: false,
                    shakeTowards: 'leaves'
                }
            },
            physics: {
                enabled: false  // Disabled physics for more stable layout
            },
            interaction: {
                hover: true,
                tooltipDelay: 200,
                zoomView: false,
                dragView: true,
                keyboard: {
                    enabled: true,
                    speed: { x: 10, y: 10, zoom: 0.1 },
                    bindToWindow: false
                }
            }
        };

        const network = new vis.Network(container, data, options);

        // Disable physics after initial layout
        network.once('stabilized', function() {
            network.setOptions({ physics: { enabled: false } });
        });

        // Hide loading state immediately after network creation
        network.once('afterDrawing', () => {
            loading.style.display = 'none';
        });

        // Enhanced Resource Map with 80+ resources
        const resourceMap = {
            'Basic Mathematics': [
                {
                    type: 'book',
                    title: 'Basic Mathematics',
                    link: 'https://www.amazon.com/Basic-Mathematics-Serge-Lang/dp/0387967877',
                    comment: 'Foundational textbook'
                }
            ],
            'Introduction to OR': [
                {
                    type: 'book',
                    title: 'Operations Research: An Introduction',
                    link: 'https://www.amazon.com/Operations-Research-Introduction-Hamdy-Taha/dp/0134444019',
                    comment: 'Comprehensive introductory textbook'
                },
                {
                    type: 'course',
                    title: 'OR Fundamentals (Coursera)',
                    link: 'https://www.coursera.org/specializations/operations-research'
                },
                {
                    type: 'article',
                    title: 'OR Society Resources',
                    link: 'https://www.theorsociety.com/resources/'
                }
            ],

            'Mathematical Foundations': [
                {
                    type: 'book',
                    title: 'Advanced Engineering Mathematics',
                    link: 'https://www.amazon.com/Advanced-Engineering-Mathematics-Erwin-Kreyszig/dp/0470458364',
                    comment: 'Essential math reference'
                },
                {
                    type: 'course',
                    title: 'Mathematics for Machine Learning',
                    link: 'https://www.coursera.org/specializations/mathematics-machine-learning'
                },
                {
                    type: 'tool',
                    title: 'Wolfram Alpha Computational Engine',
                    link: 'https://www.wolframalpha.com/'
                }
            ],

            'Probability & Statistics': [
                {
                    type: 'book',
                    title: 'Introduction to Probability',
                    link: 'https://www.amazon.com/Introduction-Probability-Chapman-Statistical-Science/dp/1138369918',
                    comment: 'By Blitzstein and Hwang'
                },
                {
                    type: 'course',
                    title: 'Statistics with R Specialization',
                    link: 'https://www.coursera.org/specializations/statistics'
                }
            ],

            'Linear Programming': [
                {
                    type: 'tool',
                    title: 'OR-Tools by Google',
                    link: 'https://developers.google.com/optimization'
                },
                {
                    type: 'course',
                    title: 'Linear Optimization (edX)',
                    link: 'https://www.edx.org/course/linear-optimization'
                },
                {
                    type: 'book',
                    title: 'Linear Programming: Foundations and Extensions',
                    link: 'https://www.springer.com/gp/book/9783319188416'
                }
            ],

            'Integer Programming': [
                {
                    type: 'book',
                    title: 'Production Planning by Mixed Integer Programming',
                    link: 'https://www.amazon.com/Production-Programming-Operations-Financial-Engineering/dp/144192132X'
                },
                {
                    type: 'challenge',
                    title: 'PACE Challenge',
                    link: 'https://pacechallenge.org'
                },
                {
                    type: 'software',
                    title: 'SCIP Optimization Suite',
                    link: 'https://www.scipopt.org/'
                }
            ],

            'Nonlinear Programming': [
                {
                    type: 'book',
                    title: 'Numerical Optimization',
                    link: 'https://www.amazon.com/Numerical-Optimization-Operations-Financial-Engineering/dp/0387303030',
                    comment: 'By Jorge Nocedal'
                },
                {
                    type: 'course',
                    title: 'Nonlinear Programming MIT OCW',
                    link: 'https://ocw.mit.edu/courses/15-084j-nonlinear-programming-spring-2004/'
                },
                {
                    type: 'software',
                    title: 'AMPL Documentation',
                    link: 'https://ampl.com/resources/the-ampl-book/'
                }
            ],

            'Dynamic Programming': [
                {
                    type: 'book',
                    title: 'Dynamic Programming & Optimal Control',
                    link: 'https://www.amazon.com/Dynamic-Programming-Deterministic-Stochastic-Models/dp/1886529433',
                    comment: 'By Dimitri Bertsekas'
                },
                {
                    type: 'course',
                    title: 'Algorithms Specialization (Coursera)',
                    link: 'https://www.coursera.org/specializations/algorithms'
                },
                {
                    type: 'challenge',
                    title: 'Project Euler Problems',
                    link: 'https://projecteuler.net/'
                }
            ],

            'Multi-Objective Optimization': [
                {
                    type: 'book',
                    title: 'Multiobjective Optimization: Principles and Case Studies',
                    link: 'https://www.springer.com/gp/book/9783540406985'
                },
                {
                    type: 'tool',
                    title: 'Platypus Framework',
                    link: 'https://platypus.readthedocs.io/'
                }
            ],

            'Stochastic Programming': [
                {
                    type: 'book',
                    title: 'Introduction to Stochastic Programming',
                    link: 'https://www.springer.com/gp/book/9781461443492'
                },
                {
                    type: 'course',
                    title: 'Stochastic Optimization (MIT OpenCourseWare)',
                    link: 'https://ocw.mit.edu/courses/sloan-school-of-management/15-097-prediction-stochastic-optimization-and-data-mining-fall-2012/'
                }
            ],

            'Simulation': [
                {
                    type: 'book',
                    title: 'Simulation Modeling and Analysis',
                    link: 'https://www.amazon.com/Simulation-Modeling-Analysis-Averill-Law/dp/0073294411'
                },
                {
                    type: 'software',
                    title: 'AnyLogic Tutorials',
                    link: 'https://anylogic.help/'
                },
                {
                    type: 'case study',
                    title: 'Healthcare System Simulation',
                    link: 'https://www.informs-sim.org/wsc17papers/includes/files/029.pdf'
                }
            ],

            'Decision Analysis': [
                {
                    type: 'book',
                    title: 'Decision Making Under Uncertainty',
                    link: 'https://www.amazon.com/Decision-Making-Uncertainty-Theory-Introduction/dp/0262528961'
                },
                {
                    type: 'tool',
                    title: 'DecisionTree.js Library',
                    link: 'https://github.com/luciopaiva/decision-tree'
                },
                {
                    type: 'article',
                    title: 'Introduction to Decision Analysis',
                    link: 'https://towardsdatascience.com/introduction-to-decision-analysis-6a3b6c3a0c4a'
                }
            ],

            'Stochastic Processes': [
                {
                    type: 'book',
                    title: 'Introduction to Probability Models',
                    link: 'https://www.amazon.com/Introduction-Probability-Models-Eleventh-Statistical/dp/0124079482'
                },
                {
                    type: 'course',
                    title: 'Stochastic Processes (edX)',
                    link: 'https://www.edx.org/course/stochastic-processes'
                },
                {
                    type: 'tutorial',
                    title: 'Monte Carlo Methods',
                    link: 'https://machinelearningmastery.com/monte-carlo-sampling-for-probability/'
                }
            ],

            'Advanced Topics': [
                {
                    type: 'book',
                    title: 'Metaheuristics: From Design to Implementation',
                    link: 'https://www.amazon.com/Metaheuristics-Design-Implementation-El-Ghazali-Talbi/dp/0470278587'
                },
                {
                    type: 'course',
                    title: 'Multi-Objective Optimization',
                    link: 'https://www.coursera.org/learn/multi-objective-optimization'
                },
                {
                    type: 'paper',
                    title: 'Recent Advances in OR',
                    link: 'https://pubsonline.informs.org/doi/10.1287/opre.2020.2031'
                }
            ],

            'Software Tools': [
                {
                    type: 'tool',
                    title: 'Gurobi Optimizer',
                    link: 'https://www.gurobi.com/'
                },
                {
                    type: 'tutorial',
                    title: 'Python for OR with PuLP',
                    link: 'https://coin-or.github.io/pulp/'
                },
                {
                    type: 'library',
                    title: 'SciPy Optimization',
                    link: 'https://docs.scipy.org/doc/scipy/reference/optimize.html'
                },
                {
                    type: 'software',
                    title: 'CPLEX Optimization Studio',
                    link: 'https://www.ibm.com/products/ilog-cplex-optimization-studio'
                }
            ],

            'Case Studies': [
                {
                    type: 'book',
                    title: 'Supply Chain Engineering',
                    link: 'https://www.amazon.com/Supply-Chain-Engineering-Applications-Operations/dp/1032254750'
                },
                {
                    type: 'article',
                    title: 'Mathematical Optimization in Real Life',
                    link: 'https://www.linkedin.com/posts/chahira-mourad_athens-setcoveringproblem-nphard-activity-7243167120660873217-UQVe/'
                },
                {
                    type: 'case study',
                    title: 'Airline Crew Scheduling',
                    link: 'https://www.gurobi.com/resource/airline-crew-scheduling-case-study/'
                }
            ],

            'Supply Chain Optimization': [
                {
                    type: 'case study',
                    title: 'Amazon Supply Chain Optimization',
                    link: 'https://www.amazon.science/research-areas/operations-research'
                },
                {
                    type: 'tool',
                    title: 'Supply Chain Guru',
                    link: 'https://www.llamasoft.com/supply-chain-guru/'
                },
                {
                    type: 'course',
                    title: 'Supply Chain Analytics (edX)',
                    link: 'https://www.edx.org/professional-certificate/supply-chain-analytics'
                }
            ],

            'Healthcare OR': [
                {
                    type: 'paper',
                    title: 'OR in Healthcare Applications',
                    link: 'https://pubsonline.informs.org/doi/10.1287/opre.2020.2031'
                },
                {
                    type: 'tool',
                    title: 'Hospital Resource Planner',
                    link: 'https://anylogic.com/healthcare/'
                },
                {
                    type: 'case study',
                    title: 'COVID-19 Resource Allocation',
                    link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7442683/'
                }
            ],

            'Energy Systems': [
                {
                    type: 'paper',
                    title: 'Optimization in Renewable Energy Systems',
                    link: 'https://www.sciencedirect.com/science/article/pii/S0306261917309036'
                },
                {
                    type: 'tool',
                    title: 'Energy Exemplar PLEXOS',
                    link: 'https://energyexemplar.com/software/plexos/'
                }
            ]
        };

        const typeIcons = {
            book: 'fas fa-book',
            course: 'fas fa-graduation-cap',
            tool: 'fas fa-tools',
            paper: 'fas fa-file-alt',
            article: 'fas fa-newspaper',
            'case study': 'fas fa-briefcase',
            software: 'fas fa-laptop-code',
            dataset: 'fas fa-database',
            video: 'fas fa-video',
            podcast: 'fas fa-podcast',
            challenge: 'fas fa-trophy',
            community: 'fas fa-users',
            tutorial: 'fas fa-chalkboard-teacher',
            library: 'fas fa-code'
        };

        // Node click handler
        network.on("click", function(params) {
            if (params.nodes.length) {
                const nodeId = params.nodes[0];
                const node = nodes.get(nodeId);
                showResourcePopup(node.label);
            }
        });

        // Popup handling
        const popup = document.getElementById('resource-popup');
        const overlay = document.getElementById('popup-overlay');

        function showResourcePopup(nodeLabel) {
            const content = document.getElementById('resource-content');
            const title = document.getElementById('node-title');
            
            title.textContent = nodeLabel;
            content.innerHTML = '';
            
            try {
                if (resourceMap[nodeLabel]) {
                    resourceMap[nodeLabel].forEach(resource => {
                        const card = document.createElement('div');
                        card.className = 'resource-card';
                        card.innerHTML = `
                            <div class="resource-type">
                                <i class="${typeIcons[resource.type]}"></i>
                                ${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                            </div>
                            <a href="${resource.link}" target="_blank" class="resource-link">
                                ${resource.title}
                            </a>
                            ${resource.comment ? `<div class="resource-comment">${resource.comment}</div>` : ''}
                        `;
                        content.appendChild(card);
                    });
                } else {
                    content.innerHTML = '<div class="no-resources">No resources available for this topic yet.</div>';
                }
            } catch (error) {
                content.innerHTML = `
                    <div class="error-message" role="alert">
                        Sorry, there was an error loading the resources. Please try again.
                    </div>
                `;
                console.error('Error loading resources:', error);
            }
            
            popup.classList.add('visible');
            overlay.classList.add('visible');
        }

        // Close popup handlers
        document.getElementById('close-popup').addEventListener('click', closePopup);
        overlay.addEventListener('click', closePopup);

        function closePopup() {
            popup.classList.remove('visible');
            overlay.classList.remove('visible');
        }

        // Window resize handler
        window.addEventListener('resize', () => {
            network.fit();
        });

        // Escape key to close popup
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closePopup();
            else if (e.key === 'Tab' && popup.classList.contains('visible')) {
                // Keep focus within popup when it's open
                const focusableElements = popup.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const firstFocusableElement = focusableElements[0];
                const lastFocusableElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey && document.activeElement === firstFocusableElement) {
                    e.preventDefault();
                    lastFocusableElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
                    e.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        });

    } catch (error) {
        loading.innerHTML = `
            <div class="error-message" role="alert">
                Sorry, there was an error loading the knowledge graph. Please refresh the page.
            </div>
        `;
        console.error('Error initializing network:', error);
    }
});