$(function() {
	$('.select-stateForm').selectize({
		sortField: 'text'
	});
});


function initializeLieux(lieux){
	var country = $('select[name=country]').val();
	var contenue = "";
	for(lieu of lieux){
		if(lieu.country.keyCountry === country){
			contenue = contenue + '<option value="' + lieu.id + '">' + lieu.label + '</option>';
		}
	}
	$('select[name=state]').html(contenue);						
	
}

hotels = [];
lieux =  []
function initialize(){
	$.ajax({
		url: '/api/hotel',
		type: 'get',
		data: {},
		success: function(response) {
			hotels = response;
			var contenue = "";
			for(hotel of hotels){
				contenue = contenue + '<tr>\n';
				contenue = contenue + '<td><span class="custom-checkbox"> <input type="checkbox" id="checkbox1" name="options[]" value="1"> <label for="checkbox1"></label></span></td>\n';
				contenue = contenue + '<td>' + hotel.nomHotel + '</td>\n'
				contenue = contenue + '<td>'+  hotel.nombreEtoile + '</td>\n'
				contenue = contenue + '<td>' + hotel.ville.label + '</td>\n'
				contenue = contenue + '<td><a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a> <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a></td>\n'
				contenue = contenue + '</tr>\n'
			}
			$('#hotelslist').html(contenue);
		}
	});

	$.ajax({
		url: '/api/lieux',
		type: 'get',
		data: {},
		success: function(response) {
			lieux = response;
			initializeLieux(lieux);
		}
	});

	$('select[name=country]').change(function(){
		initializeLieux(lieux);
	});

}

jQuery(document).ready(function() {
	initialize();

});