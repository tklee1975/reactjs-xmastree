
// General Function in global scope

function getXmasArray(treeSize) {
  var treeArray = [];



  for(var i=0; i<treeSize; i++) {
    var treeIndex = (i*2) + 3;
    var start = parseInt(treeIndex/2);
    if(start <= 0) {
      start = 1;
    }

    for(var j=start; j<=treeIndex; j++){
      treeArray.push(j);    // j is number of "*" in the row
    }
  }

  var trunkSize = treeSize / 2;
  if(trunkSize < 2) { trunkSize = 2; }
  for(var i=0; i<4; i++) {
    treeArray.push(trunkSize);
  }

  return treeArray;
}


// Test Prime
var ChristmasTree = React.createClass({
  getDefaultProps: function() {
    return {
      treeSize: 8,
    };
  },

  render: function() {
    var treeArray = getXmasArray(this.props.treeSize);

    var renderTreeRow = function(treeLen, index) {
      var str = "";
      for(var i=0; i<treeLen; i++) {
        str += "*";
      }

      return <p>{str}</p>;
    };
    var treeH = treeArray.length;
    var style = {
      height: (treeH - 3) + "em",
    }

    return <div className="XmasTree" style={style}>{treeArray.map(renderTreeRow)}</div>;
  }
});


var ChristmasTreeMain = React.createClass({
  getInitialState: function() {
    return {treeSize: 10};
  },

  onTreeSizeChange: function() {
    var newSize = this.refs.treeSize.value;
    console.log("newSize=" + newSize);

    this.setState(
      { treeSize: newSize } 
    );
  },


  render: function() {
    var tree = <ChristmasTree treeSize={this.state.treeSize}/>;

    var options = [];
    for(var i=3; i<=10; i++) {
      options.push(i);
    }
    var optionsHtml = options.map(
				function(option) {
					return <option value={option}>{option}</option>;
				}
		);


    console.log("OPtions: " + options);

    return (
      <div className="Main">
      <div className="ControlPanel">
        <b>Tree Size:</b>
        <select ref="treeSize" defaultValue={this.state.treeSize} onChange={this.onTreeSizeChange}>
        {optionsHtml}
        </select>
      </div>
      <hr noshade/>
      {tree}
      <p id="Greeting">Merry Christmas</p>
      </div>
    );
  }
});

ReactDOM.render(<ChristmasTreeMain/>, document.getElementById('ChristmasTree'));
