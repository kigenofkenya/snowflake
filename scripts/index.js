
//test data
var initparams={header:"app/main/main.html",body:"main page launhed from index"};
//target iframe id
var iframe = document.getElementById("iframeId");


myFunction = function(args) {
    console.log('franmeset reply' + args);
}

var setFrame = function(params, callback) {
    iframe.src = params.header;
    iframe.onload = function() {
        callback(params.body);
    };
};


//load page
var loadApp = function(app){
	
setFrame({header:"app/"+app.Ref+"/index.html",body:app.Params}, function(rets) {
    iframe.contentWindow.myFunction(rets);
});
};


var testApp={
	Ref:"test",
    Params :{
      funcBlock: "testFUNCS",
      subFunc: "func1",
      funcParams:"client1 test app"
}
};
// loadApp(testApp);
var mainApp={
	Ref:"main",
    Params :{
      funcBlock: "testFUNCS",
      subFunc: "func1",
      funcParams:"client1 main app"
}
};
// loadApp(mainApp);
var gdryApp={
	Ref:"gdry",
    Params :{
      funcBlock: "testFUNCS",
      subFunc: "func2",
      funcParams:"https://script.google.com/macros/s/AKfycbx6K5xSFcvkMmLwkFt4O7SZHuVT02Te1Jg7c1-OuA7PPleCkJM/exec"
}
};
loadApp(gdryApp);