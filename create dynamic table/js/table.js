		var row = 2;       //start 2th row
        var maxrow = 20;  //limited at max row
        var dataObject ={};
$(document).ready(function () { 
 
 $('table.display').DataTable();
  $('table.example').DataTable();
   /* $('button').click( function() {
        var data = table.$('input, select').serialize();
        alert(
            "The following data would have been submitted to the server: \n\n"+
            data.substr( 0, 120 )+'...'
        );
        return false;
    } );*/




    $(".currentyear").val(getToDay());
    $('.addBtn').on('click', function () {
        if(row <= maxrow){
            addTableRow();

        }
        else{
            alert("Limited max size is 20");
        }
    });
   
     $('.savestudent').click(function(){
       var stulist = [];
        $("tbody tr").each(function(index,value){
                  var name = $("td:eq(1) .stuname",this).val();
				  var gender = $('td:eq(2) [type=radio]:checked', this).val();
				  var fname =  $("td:eq(3) .fname",this).val();
				  var nrc =  $("td:eq(4) .nrc",this).val();
				  var entrance =  $("td:eq(5) .entrance",this).val();
				  var address = $("td:eq(6) .address",this).val();
				  var phno =  $("td:eq(7) .phno",this).val();
				  var currentyear =  $("td:eq(8) .currentyear",this).val();
		          stulist.push(new Student(name,gender,fname,nrc,entrance,address,phno,currentyear));
			
        });
          dataObject.data = stulist;
        var data1 = JSON.stringify(dataObject);
        console.log(data1);
        $.ajax({
        url : "writeJSON.action",
        data : data1,
        dataType : 'json',
        contentType : 'application/json',
        type : 'POST',
        async : true,
        success : function(res) {
            console.log(res.data.length);
            for(var i=0; i<res.data.length;i++){
                console.log(" "+res.data[i].name+"-"+res.data[i].id+"-"+res.data[i].active+"-"+res.data[i].date);
            }
        }
    });

      
    });
 
});
//create student object
function Student(name,gender,fname,nrc,entrance,address,phno,currentyear)
	{
         this.name=name;
         this.gender=gender;
         this.fname=fname;
         this.nrc=nrc;
         this.entrance=entrance;
         this.address=address;
         this.phno=phno;
         this.currentyear=currentyear;
    }

 function addTableRow()
    {
        var tempTr = $('<tr>'+
                        '<td><label class="count">'+row+'</label></td>'+
                        '<td><input type="text"   class="form-control stuname"/></td>'+
                        '<td>'+
                            '<input type="radio" name="gender" value="female" > Female<br>'+
                            '<input type="radio" name="gender" value="male" > Male<br>'+
                        '</td>'+
                        '<td><input type="text"   class="form-control fname" /></td>'+
                        '<td><input type="text"   class="form-control nrc" /></td>'+
                        '<td><input type="text"   class="form-control entrance" /></td>'+
                        '<td><textarea   class="form-control address" /></td>'+
                        '<td><input type="text"   class="form-control phno" /></td>'+
                        '<td><input type="date"   class="form-control currentyear" /></td>'+
                        '</tr>');
     
        var delBtn = $('<td><span class="glyphicon glyphicon-minus addBtnRemove"></span></td>').on('click', function () {
           $(this).closest('tr').remove(); 
           $('#count').text($('tbody tr').size()); 
            row--;
            $("tbody tr").each(function(index,value){
                      $('td:eq(0)', this).html('<label class="count">'+(index+1)+'</label>');
                      });
        });
        
        $("#tableAddRow").append(tempTr.append(delBtn));
        $(".currentyear").val(getToDay());
        $('#count').text($('tbody tr').size()); 
        row++;
    }
     function getToDay(){
     var now = new Date();
        var month = (now.getMonth() + 1);               
        var day = now.getDate();
        if(month < 10) 
            month = "0" + month;
        if(day < 10) 
            day = "0" + day;
        var today = now.getFullYear() + '-' + month + '-' + day;
        return today;
 }