	 

		var row = $('tbody tr').size();       //start 2th row
        var maxrow = 50;  //limited at max row
        var dataObject ={};
        var statelist,academiclist, formData,imagefiles ;
        var imgarray =[];
        	var table ;
$(document).ready(function () { 
	  table = $('#example').DataTable();


/*	readAcademic();
	readDivisionState();*/
    $('.addBtn').on('click', function () {
    	row++;
        if(row <= maxrow){
            addTableRow();
            $('.row_number').val($('tbody tr').size());
        }
        else{
            alert("Limited max size is " + maxrow);
        }
    });
    $('.row_number').on('change', function () { 
		table.clear().draw().destroy();
		 
    	if($(this).val() <= maxrow && $(this).val() > 0){
    		$("#tableAddRow").html("");
//    		  $("tbody tr").each(function(index,value){
//                  $('td:eq(0)', this).html('<label class="count">'+(index+1)+'</label>');
//                  });
    		for ( var i = 0; i < $(this).val(); i++) {
    			row = i+1;
    			addTableRow();
    		}
    		 table = $('#example').DataTable();
        }
        else{
            alert("Limited max size is " + maxrow);
            $(this).val(0);
        }
    });
   $("#state").change(
				function() {
					$('#uni').html('<option value ="none" class="form-control">Select University....</option>');
					$.each(statelist,function(i,state){
						if(state.divisionName === $("#state").val() ){
							$.each(state.univers,function(i,uni){
								$('#uni').append(
										'<option value="'+uni.universityName+'">' + uni.universityName
												+ '</option>');
							});
						}
					});
				});
					
     $('.savestudent').on('click',function(){
       var stulist = [];
       
       if($("#state")[0].selectedIndex <= 0 || $("#uni")[0].selectedIndex <= 0 ||  $("#aca")[0].selectedIndex <= 0){
    	   alert(" Please select ...  ");
       }
       
       else{
    	$(this).prop('disabled', true);
        $("tbody tr").each(function(index,value){
                  var name = $("td:eq(2) .stuname",this).val();
				  var gender = $('td:eq(3) [type=radio]:checked', this).val();
				  var fname =  $("td:eq(4) .fname",this).val();
				  var nrc =  $("td:eq(5) .nrc",this).val();
				  var entrance =  $("td:eq(6) .entrance",this).val();
				  var address = $("td:eq(7) .address",this).val();
				  var phno =  $("td:eq(8) .phno",this).val();
//				  var currentyear =  $("td:eq(9) .currentyear",this).val();
		          stulist.push(new Student(name,gender,fname,nrc,entrance,address,phno));
			
        });
        dataObject.data = stulist;
		dataObject.uni  = $("#uni").val();
		dataObject.aca  =  $("#aca option:selected").text();
        var data1 = JSON.stringify(dataObject);
        
        $.ajax({
        url : "saveStudent",
        data : data1,
        dataType : 'json',
        contentType : 'application/json',
        type : 'POST',
        async : true,
        success : function(res) {
        	uploadfile();
//          window.location.replace("goinsertstudent");
        }
    });
       }
        
        
    });
     $('.method1').click(function(){
    	 window.location.replace("gotomethod1");
     });
     $('.method2').click(function(){
    	 window.location.replace("gotomethod2");
     });
     $('.method3').click(function(){
    	 window.location.replace("gotomethod3");
     });
 
});
//TO create student object
function Student(name,gender,fname,nrc,entrance,address,phno)
	{
         this.stuName=name;
         this.gender=gender;
         this.fatherName=fname;
         this.nrcNo=nrc;
         this.entranceNo=entrance;
         this.address=address;
         this.phNo=phno;
//         this.current_year=currentyear;
    }

 function addTableRow()
    {
        var tempTr = $('<tr>'+
                        '<td><label class="count">'+row+'</label></td>'+
                        '<td><div class="noimage" >'+
                        '<input id="file-upload'+row+'" class="uploadfile" type="file" onchange="ValidateSize(this);">'+
  									 '<img><label for="file-upload'+row+'" class="custom-file-upload" > Browse</label>'+
						'</input></div></td>'+
                        '<td><input type="text"   class="form-control stuname"/></td>'+
                        '<td>'+
                            '<label><input type="radio"name="gender'+(row+1)+'" value="male" checked="checked"> Male</label>'+
                            '<label><input type="radio" name="gender'+(row+1)+'" value="female" > Female</label>'+
                        '</td>'+
                        '<td><input type="text"   class="form-control fname" /></td>'+
                        '<td><input type="text"   class="form-control nrc" /></td>'+
                        '<td><input type="text"   class="form-control entrance" /></td>'+
                        '<td><textarea   class="form-control address" /></td>'+
                        '<td><input type="text"   class="form-control phno" /></td>'+
//                        '<td><input type="date"   class="form-control currentyear" /></td>'+
                        '</tr>');
        var delBtn = $('<td><span class="glyphicon glyphicon-minus addBtnRemove"></span></td>').on('click', function () {
           $(this).closest('tr').remove(); 
//           $('#count').text($('tbody tr').size());
           $('.row_number').val($('tbody tr').size());
         
         
            row--;
            $("tbody tr").each(function(index,value){
                      $('td:eq(0)', this).html('<label class="count">'+(index+1)+'</label>');
                      });
        });
        
        $("#tableAddRow").append(tempTr.append(delBtn));
//        $('#count').text($('tbody tr').size()); 
//        $('.currentyear').val(getToDay());
    }
// function getToDay(){
//	 var now = new Date();
//	    var month = (now.getMonth() + 1);               
//	    var day = now.getDate();
//	    if(month < 10) 
//	        month = "0" + month;
//	    if(day < 10) 
//	        day = "0" + day;
//	    var today = now.getFullYear() + '-' + month + '-' + day;
//	    return today;
// }
 function readDivisionState(){
	    $('#state').html('<option value ="none" class="form-control">Select Division....</option>');
		$.getJSON("readDivision", function(res) {
			statelist = res.divisionList;
			for ( var i = 0; i < res.divisionList.length; i++) {
				var state = res.divisionList[i];
				$('#state').append(
						'<option value='+state.divisionName+'>' + state.divisionName
								+ '</option>');
			}
 })
 }
  function readAcademic(){
	    $('#aca').html('<option value ="none" class="form-control">Select Academic....</option>');
		$.getJSON("readAcademic", function(res) {
			academiclist = res;
			for ( var i = 0; i < academiclist.length; i++) {
				var academic = academiclist[i];
				$('#aca').append(
						'<option value='+academic.academic_year+'>' + academic.academic_year
								+ '</option>');
			}
 })
 }
 
  function readURL(input) {
	    console.log(input);
	        if (input.files && input.files[0]) {
	            var reader = new FileReader();
	            reader.onload = function (e) {
	             $(input).next('img') .attr('src',  e.target.result);
	            };
	                reader.readAsDataURL(input.files[0]);
	        }
	    }	
	    function ValidateSize(obj){
	            var ext = obj.value.match(/\.([^\.]+)$/)[1];
	            switch(ext)
	            {
	                case 'jpg':
	                case 'PNG':
	                case 'png':
	                case 'jpeg':
	                if (obj.files[0].size > (1024*1024*1)) // 1 mb for bytes.
	                    {
	                         alert("File size must under 1mb!");
	                         obj.value='';
	                         $(obj).next('img') .attr('src', "");
	                    }
	                    else{
	                        readURL(obj); 
	                    }
	                    break;
	                default:
		                   { alert('not allowed');
		                     obj.value='';
		                     $(obj).next('img') .attr('src', "");
	                }
	            }
	  }	
	    function uploadfile(){
	    	 imagefiles = $('input[type="file"]');
			   formData = new FormData();
			 for ( var i = 0; i < imagefiles.length; i++) {
				 if( $('input[type="file"]:eq('+i+')').val()  === ""){
					 formData.append('userImage', new File([""], "noImage.jpg"));
				 }
				 else{
					 formData.append('userImage', imagefiles[i].files[0]);
				 }
				}
			   $.ajax({
			        url : "uploadfile",
			        data : formData,
			         processData: false,  // tell jQuery not to process the data
			        contentType: false,
			        type : 'POST',
			        async : false,
			        success : function(res) {
			        	 $('.savestudent').prop('disabled', false);
			            alert("Success save  ("+imagefiles.length+")  rows");
			        }
			    });
	    }