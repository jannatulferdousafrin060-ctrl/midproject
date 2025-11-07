// script.js
async function loadData() {
    try {
        // Load your JSON data
        const response = await fetch('device_data.json');
        const data = await response.json();
        
        // Set initial device status and empty readings
        document.getElementById('device-status').textContent = 'Disconnected';
        document.getElementById('device-voltage').textContent = '---';
        document.getElementById('device-current').textContent = '---';
        document.getElementById('device-power').textContent = '---';

        // Call createCharts to process data
        createCharts(data);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function createCharts(data) {
    // Prepare data for charts
    const timestamps = data.map(entry => entry.timestamp);
    const currentValues = data.map(entry => entry.current);
    const voltageValues = data.map(entry => entry.voltage);
    const powerValues = data.map(entry => entry.watt);

    // Update device information
    document.getElementById('device-status').textContent = 'Disconnected';
    document.getElementById('device-voltage').textContent = '---';
    document.getElementById('device-current').textContent = '---';
    document.getElementById('device-power').textContent = '---';

    // Current Chart
    new Chart(document.getElementById('currentChart'), {
        type: 'line',
        data: {
            labels: timestamps,
            datasets: [{
                label: 'Current (A)',
                data: currentValues,
                borderColor: 'rgb(48, 70, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 0.6,
                    max: 1.2,
                    beginAtZero: false
                }
            }
        }
    });

    // Voltage Chart
    new Chart(document.getElementById('voltageChart'), {
        type: 'line',
        data: {
            labels: timestamps,
            datasets: [{
                label: 'Voltage (V)',
                data: voltageValues,
                borderColor: 'rgba(72, 0, 255, 1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: 200,
                    max: 250,
                    beginAtZero: true
                }
            }
        }
    });

    // Power Consumption Chart
    new Chart(document.getElementById('powerChart'), {
        type: 'line',
        data: {
            labels: timestamps,
            datasets: [{
                label: 'Power Consumption (W)',
                data: powerValues,
                borderColor: 'rgba(134, 11, 11, 1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Power Consumption Histogram
    new Chart(document.getElementById('powerHistogram'), {
        type: 'bar',
        data: {
            labels: timestamps,
            datasets: [{
                label: 'Power Consumption (W)',
                data: powerValues,
                backgroundColor: 'rgba(134, 11, 11, 1)',
                borderColor: 'rgba(134, 11, 17, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Scatter Plot of Voltage vs Current
    new Chart(document.getElementById('voltageCurrentScatter'), {
        type: 'scatter',
        data: {
            labels: timestamps,
            datasets: [{
                label: 'Voltage vs Current',
                data: voltageValues.map((value, index) => ({
                    x: value,
                    y: currentValues[index]
                })),
                borderColor: 'rgba(0, 145, 255, 1)',
                backgroundColor: 'rgba(0, 102, 255, 1)',
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Voltage (V)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Current (A)'
                    }
                }
            }
        }
    });

    // Heatmap (Correlation Matrix) - You can use a library like `seaborn` for visualization in Python. For web, this can be visualized with `heatmap.js`.
    createHeatmap(data);
}

// Heatmap (Correlation Matrix) Visualization
function createHeatmap(data) {
    const currentValues = data.map(entry => entry.current);
    const voltageValues = data.map(entry => entry.voltage);
    const powerValues = data.map(entry => entry.watt);

    // Create a simple heatmap matrix for correlation between current, voltage, and power
    const matrixData = [
        [currentValues, voltageValues, powerValues]
    ];

    // Here you can integrate `heatmap.js` or similar library for displaying the heatmap visualization.
    // Example of how it would be used (if you plan to use a specific heatmap JS library):
    const heatmapData = new Heatmap(matrixData);
    // Further code to integrate the heatmap visualization goes here.
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadData);

document.getElementById('user-manual-btn').addEventListener('click', function() {
    document.getElementById('user-manual').style.display = 'block';
});

document.getElementById('close-manual').addEventListener('click', function() {
    document.getElementById('user-manual').style.display = 'none';
});

