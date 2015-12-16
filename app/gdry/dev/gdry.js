
// document.getElementById("targ0").innerHTML="extern";

function executeFunctionByName(functionName, context /*, args */) {
  var args = [].slice.call(arguments).splice(2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(this, args);
}

// window.parent.myFunction(" msg from test shild:"+args);
var testFUNCS= {
  func1: function (param) {
document.getElementById("targ0").innerHTML=param;  	
    console.log("func 1 from test func block"+param);
  },
  func2: function (param) {
    console.log("func 2 from test func block"+param);
  }  
};
var mainFUNCS= {
  func1: function (param) {
    console.log("func 1 from test func block"+param);
  },
  func2: function (param) {
    console.log("func 2 from test func block"+param);
  }  
};
var funcObj={
 testFUNCS:testFUNCS,
 mainFUNCS:mainFUNCS
};
var runFunc = function (funcblock,subfunc,params){
executeFunctionByName(subfunc, funcObj[funcblock],params);
};


window.myFunction = function(args) {
	runFunc(args.funcBlock,args.subFunc,args.funcParams);

}

document.addEventListener("DOMContentLoaded", function(event) {
    if (top !== self) { // we are in the iframe
        console.log("iframe start");
        // window.parent.myFunction(" childframe test:init");         
    } else { // not an iframe
        console.log("stand alone start")
        runFunc("testFUNCS","func1","testparams internal");
       
    }

});
