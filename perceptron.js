
function dotProduct(vectorA, vectorB){
  var sum = 0;
  for (index = 0; index < vectorA.length; index++){
    sum += vectorA[index] * vectorB[index];
  }
  return sum.toFixed(2);
}

function activation(summation,threshold ){
  if (summation > threshold)
    return 1;
  else 
    return 0;
  
}

function forwardPass(inputs, weights,threshold){
  var summation = dotProduct(inputs, weights);
  var output = activation(summation,threshold);
  return output;
}

function calculateError(target,actual){
	var error = 0;
	error = target - actual;
	return error;
}

function adjustWeights(inputs, weights,learningRate,error) {
 for (var i = 0; i < inputs.length; i++) {
 	var new_weight =  learningRate * error * inputs[i];	
 	console.log("learningRate: "+learningRate+" error: "+error+" inputs["+i+"]: "+inputs[i]+ " new_weight: "+new_weight);

 	weights[i] += new_weight;	
  }
  return weights;
}
function display(inputs,weights,output,error){
	console.log('Input: '+JSON.stringify(inputs)+ ' Weights: '+JSON.stringify(weights)+ ' Output: '+output+ ' Error: '+error);
}
function learn(inputs,target, weights, learningRate,threshold){
  var output = forwardPass(inputs, weights,threshold);
  var error  = calculateError(target,output); 
  weights = adjustWeights(inputs, weights, learningRate,error);
  //display(inputs,weights,output,error);
  return weights;
  
}

function epoch(trainingSet, weights, learningRate,threshold){
  for(var i = 0; i < trainingSet.inputs.length; i++){
  	//console.log("    "+JSON.stringify(weights));

    weights = learn(trainingSet.inputs[i], trainingSet.target[i], weights, learningRate,threshold);
  }
  return weights;
}

function trial(trainingSet, weights, learningRate,threshold,trials){

  for(var i=0; i < trials; i++){
	 // 	console.log(JSON.stringify(weights));

    weights = epoch(trainingSet, weights, learningRate,threshold); 
  }
  return weights;
}


var learningRate = 0.01;
var trials = 10;
var threshold = 0;

var andTrainingSet = {
  inputs: [
    [0,0,1],[1,0,1],[0,1,1],[1,1,1]
  ],
  target:[0,0,0,1]
  };

 var orTrainingSet = {
  inputs: [
    [0,0,1],[1,0,1],[0,1,1],[1,1,1]
  ],
  target:[0,1,1,1]
  };
  
var initialWeights = [0,0,0];

//var finalAndWeights = trial(andTrainingSet, initialWeights, learningRate,threshold,trials);
//var finalOrWeights  = trial(orTrainingSet,  initialWeights, learningRate,threshold,trials); 
//epoch(andTrainingSet, initialWeights, learningRate,threshold);

