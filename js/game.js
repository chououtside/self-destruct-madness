var enemyData = [];
var collisions = [0];
var heroPosition = {
  x: 1,
  y: 2
};
var heroData = [heroPosition];
var numberOfEnemies = 10;
var widthLength = 400;
var enemyImg = 'http://vignette4.wikia.nocookie.net/pokemon/images/0/02/Voltorb_BW.gif/revision/latest?cb=20120628005233';
var heroImg = 'http://25.media.tumblr.com/3d2fc34a16624ce9bd7c0af8ab0bff0a/tumblr_mh8m0gWsGZ1rrsa2po2_r1_500.gif';
var score = [0];
var highScore = [0];
var prevHigh = 0;






for (var i = 0; i < numberOfEnemies; i++) {
  var obj = {};
  obj.x = Math.random() * widthLength;
  obj.y = Math.random() * widthLength;
  enemyData.push(obj);
}

d3.select('body').append('svg').attr('class', 'game1').attr('width', widthLength).attr('height', widthLength);

d3.select('.game1').selectAll('image').data(heroData).enter().append('image').attr({
  class: 'trainer',
  'xlink:href': heroImg,
  x: function(d){return d.x;},
  y: function(d){return d.y;},
  height: 50 + 'px',
  width: 50 + 'px',  
});

d3.select('.game1').selectAll('image').data(enemyData).enter().append('image')

.attr({
  class: 'enemy',
  'xlink:href': enemyImg,
  x: function(d){return d.x;},
  y: function(d){return d.y;},
  height: 50 + 'px',
  width: 50 + 'px',
});

console.log(enemyData);

var move = function() {
  d3.select('.game1').selectAll('.enemy').data(enemyData).transition().duration(1000).attr({
    x: function(d) {
      return d.x;
    },
    y: function(d) {
      return d.y;
    }
  });
};

var move = function() {
  d3.select('.game1').selectAll('.enemy').data(enemyData).transition().duration(1000)


  .attr({
    x: function(d) {
      return d.x;
    },
    y: function(d) {
      return d.y;
    }
  });
};

// move();
var updatePosition = function(obj) {
  obj.x = Math.random() * widthLength;
  obj.y = Math.random() * widthLength;
};

var updateAllPositions = function(dataset) {
  for (var i = 0; i < dataset.length; i++) {
    updatePosition(dataset[i]);
  }
};

var update = function() {
  setInterval(function() {
    updateAllPositions(enemyData);
    move();

  }, 1000);
};

update();

var trainer = d3.select('.trainer');

var drag = d3.behavior.drag().origin(function() {
    var t = d3.select(this);
    return {
      x: t.attr("x"),
      y: t.attr("y")
    };
  })
  .on('drag', function() {
    trainer.attr('x', Math.min(d3.event.x)).attr('y', Math.min(d3.event.y));
  });

// .on("drag", function(){

// 	// var dx = d3.event.dx;
// 	// var dy = d3.event.dy;
// 	// trainer.attr('x', dx ).attr('y', dy);
// 		// x: trainer.attr('x') + dx,
// 		// y: trainer.attr('y') + dy

// 	// console.log(dx, dy);
// });
// function dragmove(d) {
//   var x = d3.event.x;
//   var y = d3.event.y;
//   d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
// }

d3.select('.trainer').call(drag);

// d3.select('.trainer').on('.drag', function() {
//   var dx = d3.event.x;
//   var dy = d3.event.y;
//   trainer.attr('x', dx).attr('y', dy);
// });

function distance(x1, x2, y1, y2) {
	var sum = Math.pow((x1 - x2),2) + Math.pow((y1-y2), 2);
	var dis = Math.sqrt(sum);
	return dis;
}

var checkDistance = function(){
		var x2s = d3.select('.trainer').attr('x');
		var y2s = d3.select('.trainer').attr('y');
	d3.selectAll('.enemy').each(function(){
		// console.log(d3.select(this).attr('x'), d3.select(this).attr('y'));
		var x1s = d3.select(this).attr('x');
		var y1s = d3.select(this).attr('y');


		// console.log(x1s, y1s);

		var distanceBetween = distance(x1s, x2s, y1s, y2s);

		if(distanceBetween < 30){
      prevHigh = score[0];
      if (prevHigh > highScore[0]){
        highScore[0] = prevHigh;
        d3.select('.highScore').data(highScore).text(function(d){return d;});
      }
			score[0] = 0;
      console.log('hi');

		}

		// var sum = Math.pow((x1 - x2),2) + Math.pow((y1-y2), 2);
		// var distance = Math.sqrt(sum);

		// if (distance < 50){
		// 	console.log('collide');
		// }
		// console.log(distance);
	});
};

// console.log(d3.select('.enemy').attr('x'), d3.select('.enemy').attr('y'));

var setScore = function(){
  score[0] ++;
};



var scoreCounter = function(){
  setInterval(function(){
    setScore();
    d3.select('.count').data(score).text(function(d){return d;});
  }, 200);
};

var print = function(){
  setInterval(function() {
    checkDistance();

  }, 25);
};

print();
scoreCounter();