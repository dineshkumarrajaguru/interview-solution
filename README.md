## Steps to run
1. git clone https://github.com/dineshkumarrajaguru/interview-solution.git
2. cd interview-solution/marketing-analytics-dashboard
3. npm i
4. ng s -o
   

# Coding Challenge: Design a Dashboard

[Use this Mockup file](https://www.figma.com/file/81BjV4wM7ULNuep6siNKBm/Interview-Challenge%3A-Design-a-Dashboard?node-id=0%3A1)

**NOTE**: Clone this repository and build your application on this repository, then share it with me at the end of the process.

## Preface

Our company wants to create a new product and make it available to our clients. The product will be a marketing analytics dashboard where the clients can see all of their marketing channels together along with their relevant metrics: spend, revenue, orders, etc.

In order to build the marketing analytics dashboard, the following has been provided:

1. The design team has provided a high-fidelity mockup that Product wants to see turned into a functional prototype.
2. The API team has provided response mockups from two API queries they are providing to the front-end.
    1. Layout Response: All configuration data required to build the layout of the dashboard
    2. Data Response: All data for each of the widgets


## How-to

On the right-hand side of the [design mockup](https://www.figma.com/file/81BjV4wM7ULNuep6siNKBm/Interview-Challenge%3A-Design-a-Dashboard?node-id=0%3A1) there are names for each section.

The Mocked Data response is available in this repository [here](https://github.com/gcko/interview-challenge/blob/main/dashboard-mock-response.ts).

Each widget on the page is referenced in the layout response under the `layout` property. the `layout` property should be used to create the UI of all of the dashboard widgets.

`fieldDefinitions` is a keyed object of all of the metrics and dimensions that are used throughout the dashboard. each definition includes:



1. `label`: the display name
2. `format`: how the data should be formatted. options are none, currency, percent
3. `type`: Determines if it is a 'number' field or a 'string' field
4. `aggFn`: used to determine if the metric should be "summed" or "averaged" in the total line in the table
5. `digitsInfo`: applies to number or currency formatted fields. See [this](https://angular.io/api/common/DecimalPipe) for more info.


## Details about each Layout Section
1. Metrics Overview
    1. Metrics are grouped together. Each metric under the group has its own displayOrder that is used to determine how it should be displayed. 
    2. The data for this is at `backendDataResponse.dataPoints`
2. Table
    1. `fields`: a list of objects, where each object contains a name of a field that should be shown for that column. the name points to the key in the data response
    2. The data for this is at `backendDataResponse.dataSets[0]`


## Requirements

1. This must be built within Angular 13
2. This must use typescript
3. Use whatever you want to build the table


## Output

1. The end result should be a functional Angular Application that can be run on localhost

You have 1 week from today for this challenge. Please reach out if you have any questions.
