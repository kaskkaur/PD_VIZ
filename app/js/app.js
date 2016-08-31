// canvas draw

 var svg = d3.select("#circle").
  append("svg:svg").
  attr("width", 1005).
  attr("height", 900);

// store all the activites to draw

data = [];

//cricle svg draw

drawCircle = function() {

 svg.selectAll("circle")
  .data(data)
  .enter().append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", function(d)  {return d.r;  })
    // .attr("fill", function(d) {return d.color;})
    .attr("fill", function(d) {return "#" + d.color;})
    .attr("stroke-width", 1)
    .attr("stroke", "black")
  	.transition()
  		.on("start", function repeat() {
  			yDir = _.random(900)
  			d3.active(this)
		  		.attr("cx", 900)
		    	.attr("cy", yDir)
		    	.duration(function(d) { return d.duration;})
		    	.ease(d3.easeLinear)
		    .transition()
		    	.attr("cx", 0)
		    	.attr("cy", yDir + 300)
		    	.duration(function(d) { return d.duration;})
		    	.ease(d3.easeLinear)
		    .transition()
		            .on("start", repeat);

		     

    })
    	
  }


// create the circle with required activity data to display in the view
actSvg = function(xPos, yPos, radius, color, transitionY, velocity) {

activity = {"x": xPos, "y": yPos, "r": radius, "color": color, "yTrans": yTrans, "duration": duration}

data.push(activity);
// console.log(xPos, yPos, radius)

drawCircle()


}


api_key = "";

currentColor = 0;
//get api key and create random measured circles


$("#save_key").click(function() {

	newColor = _.random(1)
 
	api_key = $("#key").val();
	
	
	yTrans = _.random(200, 900)
	
	duration = 0;

	colorrange = ["ff6868", "8dfc1e", "ffffff"]
	
	colorpicker = function(){

		

		if (currentColor === newColor) {
			currentColor = newColor + 1;

		} else {

			currentColor = newColor;

		}

	}

	colorpicker()


	velocitypicker = function(){


		if (currentColor === 0) {

			duration = _.random(7000, 7550)
			r = 100
		
		} else if ( currentColor === 1) {

			duration = _.random(4000, 4500)
			r = 50


		} else if(currentColor === 2) {

			duration = _.random(1500, 1550)
			r = 20


		}
	}

	velocitypicker()


	actSvg(x, y, r, colorrange[currentColor], yTrans, duration)
	
	// d3.selectAll("circle").transition(t)
 //    .attr("cx", 900)

	// console.log(colorrange[currentColor])

});


// API CALL


var ActArray = [];
var ActSubject = [];
var ActDueDate = [];
var ActDueDateConvert = [];
var ActDealTitle = [];

actCall = function() {

var apiKey = "ed47c2d4fd36fb31073d5f1aefd5f37af260eb93";
			// var recipeID = 196149;
			var url = " https://api.pipedrive.com/v1/activities?start=0&done=0&api_token=" + apiKey

			
			$.ajax({
			         type: "GET",
			         dataType: 'json',
			         cache: false,
			         url: url,
			         context: this,
			         success: function (data) {

			         	
			         	results = data.data;

			         		// getActDetails();

			         		for (var i = 0; i < results.length; i++) {
			         			ActArray.push(results[i])

			         		}
			         	
			         		getActDetails();

			           
			            }

			         });

}


$("#api_call").click(function() {

actCall();


});

Date.prototype.withoutTime = function () {
    var d = new Date(this);
    d.setHours(0, 0, 0, 0, 0);
    return d
	}


DateRadius = function(date){

	today = new Date().withoutTime()

	date = new Date().withoutTime()

	


}



getActDetails = function(){


	colorrange = ["ff6868", "8dfc1e", "ffffff"]
	currentColor = 0;


	$.each(ActArray, function( index, value ) {

		// $.each(this, function(index, value){
			// ActSubject.push(value.subject)
			DueDate = new Date(value.due_date).withoutTime()
			today = new Date().withoutTime()
			convertedTime = DueDate.getTime()
			r = convertedTime / 100000000000
			x = _.random(800)
			y = _.random(900)
			yTrans = _.random(200, 900)
			
			console.log(today)
			console.log(DueDate)


			if (DueDate.getTime() == today.getTime()) {
				

				currentcolor = 1

				duration = _.random(7000, 7550)

			} else if (DueDate.getTime() > today.getTime()) {
				

				currentcolor = 2
				
				duration = _.random(1500, 1550)

			} else {

				currentcolor = 0

				duration = _.random(4000, 4500)
			}
			// ActDueDate.push(converted)
			// ActType.push(value.type)


		

			// $( "#TestContent" ).append(value.type);
			actSvg(x, y, r, colorrange[currentcolor], yTrans, duration)

			
		// })
	  
	});

	


// for (var i = 0; i < ActDueDate.length; i++) {
			    
// 				converted = ActDueDate.getTime();
// 			    ActDueDateConvert.push(converted)

// 			  }

}
















