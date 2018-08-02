function Node(latitude, longitude, floorNumber, nodeIndex) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.floorNumber = floorNumber;
    this.nodeIndex = nodeIndex;
    this.numConnections = 0;
    this.addAttribute = function(attributeName, attributeValue) {
        this[attributeName] = attributeValue;
    };
}

//figure out directionality
function Edge(node0, node1, edgeIndex){
    this.node0 = node0;
    this.node1 = node1;
    this.edgeIndex = edgeIndex;
    this.addSpecialLegInstruction = function(from, to, string){
        if((from == node0) && (to == node1)){
            this.from0to1 = string;
        }
        else if((from == node1) && (to == node0)){
            this.from1to0 = string;
        }
    };
    this.addAttribute = function(attributeName, attributeValue) {
        this[attributeName] = attributeValue;
    };
}