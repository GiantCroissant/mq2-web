var width = 600
var height = 600

var actualWidth = window.innerWidth
var actualHeight = window.innerHeight

var adjustedWidth = actualWidth * 0.9
var adjustedHeight = actualHeight * 0.9

var workspaceTotalHeight = adjustedHeight
var workspaceOverviewHeight = 100
var workspaceSeparatorHeight = 7
var workspaceContentHeight = adjustedHeight - workspaceOverviewHeight - workspaceSeparatorHeight

//console.log(adjustedWidth)
//console.log(adjustedHeight)

var workspaceCollection = [
  {
    "title": "Workspace 101"
  },
  {
    "title": "Workspace 231"
  },
  {
    "title": "Workspace 232"
  },
  {
    "title": "Workspace 233"
  },
  {
    "title": "Workspace 234"
  },
  {
    "title": "Workspace 235"
  },
  {
    "title": "Workspace 236"
  },
  {
    "title": "Workspace 237"
  },
  {
    "title": "Workspace 238"
  },
  {
    "title": "Workspace 239"
  },
  {
    "title": "Workspace 240"
  }
]

var dataNodeCollection = [
  {
    "title": "Movie",
    "position": [0, 0]
  },
  {
    "title": "User",
    "position": [0, 0]
  },
  {
    "title": "Project",
    "position": [0, 0]
  }
]

var svg = d3.select("body")
  .append("svg")
  .attr("width", adjustedWidth)    
  .attr("height", adjustedHeight)

var overview = svg.append("svg:g")
  .attr("id", "overview")
  .attr("transform", "translate(0,0)")

var separatorDrag = d3.behavior.drag()
  .on("dragstart", handleSeparatorDragStart)
  .on("drag", handleSeparatorDrag)

var separator = svg.append("svg:g")
  .call(separatorDrag)
  .attr("id", "separator")
  .attr("transform", "translate(" + 0 + "," +  workspaceOverviewHeight + ")")

var content = svg.append("svg:g")
  .attr("transform", "translate(" + 0 + "," +  (workspaceOverviewHeight + workspaceSeparatorHeight) + ")")

var contentForeground = content.append("svg:g")
  .attr("transform", "translate(0,0)")

var contentMiddleground = content.append("svg:g")
  .attr("transform", "translate(0,0)")

var contentBackground = content.append("svg:g")
  .attr("transform", "translate(0,0)")

var contentTitle = content.append("svg:g")
  .attr("transform", "translate(0,0)")

var workspaceOverview = overview.selectAll(".workspaceOverview").data(workspaceCollection)
  .enter().append("svg:rect")
  .style("fill", "green")
  .attr("width", 100)
  .attr("height", 60)
  .attr("transform", function(d, i) {
    var perRowCount = 4
    var rowStartX = (i % perRowCount) * 110 + 20
    var rowStartY = Math.floor(i / perRowCount) * 70
    var position = [rowStartX, rowStartY]
    return "translate(" + position + ")"
  })

function handleSeparatorDragStart(d, i) {
  d3.event.sourceEvent.stopPropagation()
}

function handleSeparatorDrag(d, i) {
    var xDiff = d3.event.dx
    var yDiff = d3.event.dy
    
    //var workspaceNameWidth = document.getElementById('workspaceName')
        //.val()
    //    .getComputedTextLength()

    //console.log(workspaceNameWidth)
    
    workspaceOverviewHeight += yDiff
    //if (workspaceOverviewHeight > (workspaceTotalHeight - 20)) {
    //    workspaceOverviewHeight = (workspaceTotalHeight - 20)
    //} else if (workspaceOverviewHeight < 50) {
    //    workspaceOverviewHeight = 50
    //}
    separator.attr("transform", "translate(" + 0 + "," +  workspaceOverviewHeight + ")")
    content.attr("transform", "translate(" + 0 + "," +  (workspaceOverviewHeight + workspaceSeparatorHeight) + ")")
}

var separatorIndication = separator.append("svg:rect")
  //.attr("class", "nodeRect")
  .style("fill", "gray")
  .style("opacity", 0.2)
  .attr("width", adjustedWidth)
  .attr("height", workspaceSeparatorHeight)
  .attr("transform", function(d, i) {
    var position = [
        actualWidth * 0.1 * 0.5,
        0
    ]
    return "translate(" + position + ")"
  })

var separatorIndication2 = separator.append("svg:rect")
  //.attr("class", "nodeRect")
  .style("fill", "gray")
  .style("opacity", 0.8)
  .attr("width", 10)
  .attr("height", 2)
  .attr("transform", function(d, i) {
    var position = [
        actualWidth * 0.5,
        0
    ]
    return "translate(" + position + ")"
  })

var separatorIndication3 = separator.append("svg:rect")
  //.attr("class", "nodeRect")
  .style("fill", "gray")
  .style("opacity", 0.8)
  .attr("width", 10)
  .attr("height", 2)
  .attr("transform", function(d, i) {
    var position = [
        actualWidth * 0.5,
        5
    ]
    return "translate(" + position + ")"
  })

var contentTitleText = contentTitle.append("text")
  .style("fill", "black")
  .style("font-size", "22px")
  .attr("dy", ".35em")
  .attr("text-anchor", "end")
  .attr("transform", "translate(100,40) rotate(0)")
  .text("Workspace")

var contentTitleLine = contentTitle.append("sag:line")
  .attr("x1", 0)
  .attr("y1", 0)
  .attr("x2", 120)
  .attr("y2", 0)
  .attr("transform", "translate(0, 60)")
  .style("stroke", "black")
  .style("stroke-width", 2)

var dataNodeDrag = d3.behavior.drag()
  .on("dragstart", handleDataNodeDragStart)
  .on("drag", handleDataNodeDrag)

var dataNode = contentForeground.selectAll(".dataNode").data(dataNodeCollection)
  .enter().append("svg:circle")
    .call(dataNodeDrag)
    .attr("id", function(d, i) { return "dataNode-" + i })
    .attr("r", 10)
    .attr("transform", function(d, i) {
      var position = [
          (i * 30) + 20,
          (i * 20) + 140
      ]
      return "translate(" + position + ")"      
    })

function handleDataNodeDragStart(d, i) {
  d3.event.sourceEvent.stopPropagation()
}

function handleDataNodeDrag(d, i) {
  var xDiff = d3.event.dx
  var yDiff = d3.event.dy

  d.position[0] += xDiff
  d.position[1] += yDiff

  d3.select(this).attr("transform", "translate(" + d.position + ")")

  //var specificDataNode = d3.select("#dataNode-" + i)
}
