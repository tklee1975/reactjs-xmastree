
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
      treeSize: 7,
      treeIcon: "🙂"
    };
  },

  render: function() {
    var treeArray = getXmasArray(this.props.treeSize);
    var treeIcon = this.props.treeIcon;

    var renderTreeRow = function(treeLen, index) {
      var str = "";
      for(var i=0; i<treeLen*2-1; i++) {
        str += treeIcon;
      }

      return <p style={{height: '0.5em'}} >{str}</p>;
    };
    var treeH = treeArray.length;
    var style = {
      height: (treeH) * 1.5 + "em",
    }

    return <div className="XmasTree" style={style}>{treeArray.map(renderTreeRow)}</div>;
  }
});


var ChristmasTreeMain = React.createClass({
  getInitialState: function() {
    return {treeSize: 7, treeIcon: '❤️'};
  },

  onTreeSizeChange: function() {
    var newSize = this.refs.treeSize.value;
    console.log("newSize=" + newSize);

    this.setState(
      { treeSize: newSize }
    );
  },

  onTreeIconChange: function() {
    var newIcon = this.refs.treeIcon.value;

    this.setState(
      { treeIcon: newIcon }
    );
  },


  render: function() {
    var tree = <ChristmasTree treeSize={this.state.treeSize}
                              treeIcon={this.state.treeIcon}/>;

    // Options for Tree height
    var options = [];
    for(var i=3; i<=8; i++) {
      options.push(i);
    }

    console.log("rendering the options");
    var optionsHtml = options.map(
				function(option) {
					return <option value={option}>{option}</option>;
				}
		);


    // Options for Tree Char
    var iconOptions = ['@', '#', '*', '🙂', '❤️', '💑', '⭐️', '🎄'];

    console.log("rendering the char options");
    var iconOptionsHtml = iconOptions.map(
				function(option) {
					return <option value={option}>{option}</option>;
				}
		);



    console.log("Options: " + options);

    return (
      <div className="Main">
      <div>
      <span className="ControlPanel">
        <b>Tree Height:</b>
        <select ref="treeSize" defaultValue={this.state.treeSize} onChange={this.onTreeSizeChange}>
        {optionsHtml}
        </select>
      </span>

      <span className="ControlPanel">
        <b>Tree Icon:</b>
        <select ref="treeIcon" defaultValue={this.state.treeIcon} onChange={this.onTreeIconChange}>
        {iconOptionsHtml}
        </select>
      </span>
      </div>

      <hr noshade/>
      {tree}
      <p id="Greeting">Merry Christmas</p>
      </div>
    );
  }
});

ReactDOM.render(<ChristmasTreeMain/>, document.getElementById('ChristmasTree'));
