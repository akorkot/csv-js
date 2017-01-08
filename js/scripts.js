var resGlobal;
		
function filterFunc(currentObj){
	
	console.log(currentObj);
	
	jQuery.each(resGlobal, function(index, element){
					
			var objToArray = $.map(element, function(value, index) {
				return [value];
			});

			if(parseInt(objToArray[0]) == parseInt(currentObj)) {
				var tr = "";
				
				tr += "<tr>";
					tr += "<td>" + objToArray[1] + "</td>";
					tr += "<td>" + objToArray[5] + "</td>";
					tr += "<td>" + objToArray[6] + "</td>";
					tr += "<td>" + objToArray[8] + "</td>";
					tr += "<td>" + objToArray[11] + "</td>";
					tr += "<td>" + objToArray[12] + "</td>";
					tr += "<td>" + objToArray[13] + "</td>";
					tr += "<td>" + objToArray[18] + "</td>";
					tr += "<td>" + objToArray[23] + "</td>";
					 
				tr += "</tr>";
				
				$("#myDataTable tbody").html("");
				$("#myDataTable tbody").append(tr);
				 
			}  
	});
					
}

$(document).ready(function(){
	var optionsSearch = [];
	
	
	$("#submit-parse").click(function(){
		var config = buildConfig();
		
		$('#fileCsv').parse({
			config: config,
			before: function(file, inputElem)
			{
				//console.log(inputElem);
			},
			complete: function(results)
			{ 
				//console.log(results);
				console.log("Done with all files.");
			}
		});


		function buildConfig()
		{
			return {
				delimiter: ";", 
				header: true,
				encoding: "ascii",
				complete: completeFn,
			};
		}
		
				
		function completeFn()
		{	
			var rows = arguments[0].data;
			jQuery.each(rows, function(index, element){
					
					var objToArray = $.map(element, function(value, index) {
						return [value];
					});
	 
					if(objToArray[1]) {
						optionsSearch.push(objToArray[1]);

						$("#matiereActive").append($('<option>', {
							value: objToArray[0],
							text: objToArray[1]
						}));
					}  
			});
			
			$(".searchUp").fadeOut(500, function(){
				$(".searchCrit").fadeIn();
			});
			 
			
			resGlobal = rows;
		}
	
		return false;
	});
 
});