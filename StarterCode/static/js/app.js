const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Fetch json and log it 
d3.json(url).then(function(data){
    console.log(data);
})

function init () {

    // Create dropdown menu and dataset list
    let dropdownMenu = d3.select("#selDataset");

    // Set variable and append names
    d3.json(url).then((data) => {
    let names = data.names;

    names.forEach((id) =>{
        console.log(id);
        dropdownMenu.append("option")
            .text(id)
            .property("value",id);
    })

    let sample_one = names[0];
    console.log(sample_one);
    });    

    // Setup charts for future use
    createScatter(sample_one);
    createBar(sample_one);
    createSummary(sample_one);
};

// Function to create bar chart
function createBar(bar) {
    d3.json(url).then((data) => {

    });
};

// Function to create bubble scatter plot
function createScatter(bubble) {

    // Read json file and retrieve data
    d3.json(url).then((data) => {

        // Retrieve data
        let sampleInfo = data.samples;
        let value = sampleInfo.filter(result => result.id == bubble);
        let valueData = value[0];

        // Set labels for otu_ids, otu_labels, and sample_values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log items in console
        console.log(otu_ids,otu_labels,sample_values);

        // Set axis titles
        let layout = {
            xaxis : {title: "OTU_ID"},
        };

        // Set up bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };
        // Plot the chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

// Function to create summary
function createSummary(summary) {

    d3.json(url).then((data) =>{

        // Get metadata and filter
        let metadata = data.metadata;
        let value = metadata.filter(result => result.id == summary);

        // Log data in console
        console.log(value);
        let valueData = value[0];
        d3.select('#sample-metadata').html("");
        Object.entries(valueData).forEach(([key,value]) => {
            // Log in pairs
            console.log(key,value);
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        })
    })
}
// Function that updates dashboard when sample is changed
function optionChanged(sample_one) { 

    // Log the new value
    console.log(sample_one); 
  
    // Call all functions 
    createScatter(sample_one)
    createBar(sample_one)
    createSummary(sample_one)
  };
  
  // Call the initialize function
  init();


