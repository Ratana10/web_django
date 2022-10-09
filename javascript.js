var studentArray = [];
var selectedRow = -1
function onFormSubmit(){

    var data = readFormData();

    if(selectedRow == -1){
        newRecord(data)
    } else{
        updateRecord(data);
    }



}
function init(){
    
    if(localStorage.studentRecord){
        studentArray = JSON.parse(localStorage.studentRecord);
        
        for (var i=0; i<studentArray.length; i++){
            var data ={};
            data["rollNO" ] = studentArray[i].rollNO;
            data["firstName" ] = studentArray[i].firstName;
            data["lastName" ] = studentArray[i].lastName;
            data["math" ] = studentArray[i].math;
            data["khmer" ] =  studentArray[i].khmer;
            data["total"] = total(data.math, data.khmer);

            newRecord(data);
        }
    }
    
    // const dataType = typeof studentArray[0]["total"];
    // console.log(dataType);

}
function total(math, khmer){
    return parseFloat(math) + parseFloat(khmer)
}
function clearFormData(){
    document.getElementById("submit").innerHTML = "Submit";

    document.getElementById("rollNO").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("math").value = "";
    document.getElementById("khmer").value = "";

    selectedRow = -1;

}
function readFormData(){
    var data = {}
    data["rollNO" ] = document.getElementById("rollNO").value;
    data["firstName" ] = document.getElementById("firstName").value;
    data["lastName" ] = document.getElementById("lastName").value;
    data["math" ] = parseFloat(document.getElementById("math").value);
    data["khmer" ] = parseFloat(document.getElementById("khmer").value);
    data["total"] = total(data.math, data.khmer);
    
    console.log(typeof data.khmer)
    if(selectedRow == -1){

        studentArray.push(data);
    }else{
        studentArray.splice(selectedRow.rowIndex-1, 1, data)
    }
 
    localStorage.studentRecord  = JSON.stringify(studentArray);
    return data;
}
function newRecord(data){
    var table = document.getElementById("student-list").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);


    cellRollNO = newRow.insertCell(0);
    cellRollNO.innerHTML = data.rollNO;

    cellFirstName = newRow.insertCell(1);
    cellFirstName.innerHTML = data.firstName;

    cellLastName = newRow.insertCell(2);
    cellLastName.innerHTML = data.lastName;

    cellMath = newRow.insertCell(3);
    cellMath.innerHTML = data.math;

    cellKhmer = newRow.insertCell(4);
    cellKhmer.innerHTML = data.khmer;


    cellTotal = newRow.insertCell(5);
    cellTotal.innerHTML = data.total;

    cellAction = newRow.insertCell(6);
    cellAction.innerHTML = `
                            <a onclick="onEdit(this)" class="btn btn-primary" type="button">Edit</a>
                            <a onclick= "deleteStudent(this)"  class="btn btn-danger" type="button">Delete</a>
                            `
    clearFormData();
}
function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("rollNO").value = selectedRow.cells[0].innerHTML;
    document.getElementById("firstName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("lastName").value = selectedRow.cells[2].innerHTML;
    document.getElementById("math").value = selectedRow.cells[3].innerHTML;
    document.getElementById("khmer").value = selectedRow.cells[4].innerHTML;

    document.getElementById("submit").innerHTML = "Update"

}
function updateRecord(data){
    
    selectedRow.cells[0].innerHTML = data.rollNO;
    selectedRow.cells[1].innerHTML = data.firstName;
    selectedRow.cells[2].innerHTML = data.lastName;
    selectedRow.cells[3].innerHTML = data.math;
    selectedRow.cells[4].innerHTML = data.khmer;
    selectedRow.cells[5].innerHTML = data.total;
    
}
function deleteStudent(td){

    if(confirm("Are you sure to delete this record ?")){
        selectedRow = td.parentElement.parentElement.rowIndex;

        document.getElementById("student-list").deleteRow(selectedRow);
        studentArray.splice(selectedRow-1, 1);
        
        localStorage.studentRecord = JSON.stringify(studentArray);
    }

}


let sortDirection = false;
function sorting(columnName){
    const dataType = typeof studentArray[0][columnName];

    //console.log(typeof dataType);

    sortDirection = !sortDirection;
    switch(dataType){
        case 'number':
            alert("true")
            sortNumberColumn(sortDirection, columnName);
            break;
    }


    localStorage.removeItem("studentRecord");

    localStorage.setItem("studentRecord", JSON.stringify(studentArray))

    document.getElementById('tbl').innerHTML = "";
    init();

}
function sortNumberColumn(sort, columnName){
        studentArray = studentArray.sort((p1,p2) =>{
        return sort ? p1[columnName] - p2[columnName] : p2[columnName] - p1[columnName];

    });
}

