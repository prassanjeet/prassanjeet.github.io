var options = [];
options["Operation"]=['Click','Double Click','Open','Mouse Over','Mouse Away','Enter'];
options["Click"]=["Button","CheckBox","DropDown Menu","Text Box","Radio Button"];
options["Double Click"]=["Button","CheckBox","DropDown Menu","Text Box","Radio Button"];
options["Open"]=["Browser"];
options["Mouse Over"]=["Label","Text Box","Button","Picture"];
options["Mouse Away"]=["Label","Text Box","Button","Picture"];
options["Enter"]=["Text Box","Username","Password"];

var nLists = 2;

function fillSelect(currInput, currList) {
    var currCat = currInput.value;
    var currIdName = currInput.id.replace(/[0-9]/g,"");
    var num = currList.parentNode.id.replace(/\D/g,"");
    var step = Number(currList.name.replace(/\D/g,""));
    var targetId;
    switch (currIdName) {
        case "Operation":
            targetId = "Field"+num;
            break;
        case "Field":
            targetId = "Value"+num;
            break;
    
        default:
            targetId = "Field"+num;
            break;
    }
    for (var i = step; i < nLists+1; i++) {
        currList.parentNode['Option'+i].length = 1;
        currList.parentNode['Option'+i].selectedIndex = 0;
    }
    var nCat = options[currCat];
    for (each in nCat){
        var nOption = document.createElement('option');
        var nData = document.createTextNode(nCat[each]);
        nOption.setAttribute('value',nCat[each]);
        nOption.appendChild(nData);
        currList.appendChild(nOption);
    }
}

function getValue(isValue) {
    alert(isValue);
}

function init() {
    fillSelect(document.getElementById("Operation"),document.forms[0]["Option1"]);
}

var count = 1;
var step = 1;

var duplicateForm = function(){

            var source =  $('#LineItem'), 
                clone = source.clone();

            clone.find(':input').attr('id',function(i,val){
                return val.replace(/[0-9]/g,"") + count;
            });
            clone.find('form').attr('id',function(i,val){
                return val.replace(/[0-9]/g,"") + count;
            });
            clone.find('label').attr('id',function(i,val){
                return val.replace(/[0-9]/g,"") + count;
            });
            clone.attr('id','LineItem' + count);

            clone.appendTo('#outerDivForActual');
            clone.attr('style',"display:block");
            count++;
};
var duplicateFormAbove = function(currInput){
    
                var source =  $('#LineItem'), 
                    clone = source.clone();
    
                clone.find(':input').attr('id',function(i,val){
                    return val.replace(/[0-9]/g,"") + count;
                });
                clone.find('form').attr('id',function(i,val){
                    return val.replace(/[0-9]/g,"") + count;
                });
                clone.find('label').attr('id',function(i,val){
                    return val.replace(/[0-9]/g,"") + count;
                });
                clone.attr('id','LineItem' + count);
    
                clone.insertBefore(currInput.parentNode.parentNode.parentNode);
                clone.attr('style',"display:block");
                count++;
};
var duplicateFormBelow= function(currInput){
    
                var source =  $('#LineItem'), 
                    clone = source.clone();
    
                clone.find(':input').attr('id',function(i,val){
                    return val.replace(/[0-9]/g,"") + count;
                });
                clone.find('form').attr('id',function(i,val){
                    return val.replace(/[0-9]/g,"") + count;
                });
                clone.find('label').attr('id',function(i,val){
                    return val.replace(/[0-9]/g,"") + count;
                });
                clone.attr('id','LineItem' + count);
    
                clone.insertAfter(currInput.parentNode.parentNode.parentNode);
                clone.attr('style',"display:block");
                count++;
};
var destroy = function(myself) {
            var num = myself.id.replace(/\D/g,"");
            var element = document.getElementById("LineItem"+num);
                element.outerHTML="";
                delete element;
}

var csvOut = "Step,Actual,Expected\n";
var csv = "";
var actual="", expected = "";

var readActuals = function(){
    csv = "";
    document.getElementById("outerDivForCSV").innerHTML = "";
    $("#outerDivForActual form").each(
        function(){
                
                var lineItemNum = this.id.replace(/\D/g,"");
                if(lineItemNum!=""){
                var operation = document.getElementById("Operation"+lineItemNum).value;
                var field = document.getElementById("Field"+lineItemNum).value;
                var value = document.getElementById("Value"+lineItemNum).value;
                var isVar = document.getElementById("isVariable"+lineItemNum).checked;
                var isExp = document.getElementById("isExpected"+lineItemNum).checked;
                
                var realVal =  isVar ? "<<" + value + ">>":value;
                
                if(isExp==true){
                    expected = expected + operation + " " + field + " " + realVal + ". ";
                }else{
                    actual = actual + operation + " " + field + " " + realVal + ". ";
                };
            }
        }
    );
    csv = step + "," + actual + "," + expected;
    document.getElementById("outerDivForOutput").innerHTML = csv;
   
};

var downloadCSV = function(){
    var data, filename, link;
    if (csvOut == null) return;
    filename = 'export.csv'; //args.filename || 'export.csv';
    if (!csvOut.match(/^data:text\/csv/i)) {
        csvOut = 'data:text/csv;charset=utf-8,' + csvOut;
    }

    data = encodeURI(csvOut);
    link = document.createElement('a');
    link.setAttribute('href',data);
    link.setAttribute('download',filename);
    link.click();
};

var changeToPasswordType = function(currInput){
    currInput.setAttribute("type","password");
};

var changeToTextType = function(currInput){
    currInput.setAttribute("type","text");
};

var inputTypeChanger = function(input){
    if(input.value=="Password"){
        changeToPasswordType(
            document.getElementById("Value"+input.id.replace(/\D/g,""))
        );
    }else{
        changeToTextType(
            document.getElementById("Value"+input.id.replace(/\D/g,""))
        );
    }
};

var addNewStep = function(){
    readActuals();
    csvOut = csvOut + "\n" + csv;
    document.getElementById("outerDivForCSV").innerHTML = csvOut;
    $("#outerDivForActual form").each(
        function(){
                var lineItemNum = this.id.replace(/\D/g,"");
                if(lineItemNum!=""){
                    destroy(this);
            }
        }
    );
    count = 1;
    step++;
};

var moveFormAbove = function(currDiv){
    if(typeof currDiv.previousSibling.id != 'undefined'){
        currDiv.parentNode.insertBefore(currDiv,currDiv.previousSibling);        
    }
};

var moveFormBelow = function(currDiv){
    if(currDiv.nextSibling != null){
        currDiv.parentNode.insertBefore(currDiv,currDiv.nextSibling.nextSibling);        
    }
};

navigator.appName == "Microsoft Internet Explorer" ? attachEvent('onload', init, false): addEventListener('load',init,false);

$(document).ready(function(){
    $('#LineItem1').draggable({});
});