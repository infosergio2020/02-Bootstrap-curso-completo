$(function() {
    $("[data-toggle='tooltip']").tooltip();
});
$(function() {
    $("[data-toggle='popover']").popover();
});
$('.carousel').carousel({
    interval: 8000
});


$('#contacto').on('show.bs.modal', function(e) {
    console.log('el modal se esta mostrando');
    $('#contactoBtn').removeClass('btn-success');
    $('#contactoBtn').addClass('btn-secondary');
    $('#contactoBtn').prop('disabled', true);
});
$('#contacto').on('shown.bs.modal', function(e) {
    console.log('el modal se mostró');
});
$('#contacto').on('hide.bs.modal', function(e) {
    console.log('se oculta el modal');
});
$('#contacto').on('hidden.bs.modal', function(e) {
    console.log('se ocultó el modal');
    $('#contactoBtn').removeClass('btn-secondary');
    $('#contactoBtn').addClass('btn-success');
    $('#contactoBtn').prop('disabled', false);

});