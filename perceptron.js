
function summation(vectorA, vectorB){
  var sum = 0;
  for (index = 0; index < vectorA.length; index++){
    sum += vectorA[index] * vectorB[index];
  }
  return sum;
}

function activation(summation,threshold ){
  if (summation > threshold)
    return 1;
  else 
    return 0;
  
}

function forwardPass(inputs, weights,threshold){
  var bias_index = weights.length - 1;
  var summation = summation(inputs, weights);
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
  var new_weights = adjustWeights(inputs, weights, learningRate,error);
  console.log('Input: '+JSON.stringify(inputs)+ ' Weights: '+JSON.stringify(weights)+ ' Output: '+output+ ' Target: '+ target+' Error: '+error);
  return new_weights; 
}

function epoch(trainingSet, weights, learningRate,threshold){
  console.log('epoch');
  for(var i = 0; i < trainingSet.inputs.length; i++){
    weights = learn(trainingSet.inputs[i], trainingSet.target[i], weights, learningRate,threshold);
  }
  return weights;
}

function trial(trainingSet, weights, learningRate,threshold,trials){
  for(var i=0; i < trials; i++){
    weights = epoch(trainingSet, weights, learningRate,threshold); 
  }
  return weights;
}


var learningRate = 0.01;
var trials = 100;
var threshold = 0.00;

var andTrainingSet = {
  inputs: [
    [0,0],[1,0],[0,1],[1,1]
  ],
  target:[0,0,0,1]
  };

 var orTrainingSet = {
  inputs: [
    [0,0],[1,0],[0,1],[1,1]
  ],
  target:[0,1,1,1]
  };
  //third array value is bias and not weight
  //https://stackoverflow.com/questions/46189617/perceptron-for-or-function-doesnt-converge
var initialWeights = [0,0];

//var finalAndWeights = trial(andTrainingSet, initialWeights, learningRate,threshold,trials);
//var finalOrWeights  = trial(orTrainingSet,  initialWeights, learningRate,threshold,trials); 
//epoch(andTrainingSet, initialWeights, learningRate,threshold);

