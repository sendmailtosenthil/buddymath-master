/**
 * Created by svaithiyanathan on 2/5/14.
 */

$(document).ready(function() {

    $("#problemsArea").hide();
    $("#grade").click(function() {
        $("#problemsArea").show();
        $.get('/questions', function(question) {
            alert(JSON.stringify(question));
            $("#objectId").val(question._id);
            $("#qId").val(question.id);
            $('#question').html(question.question);
        });
        $("#grade").hide();
    });

    $("#evaluate").click(function() {
        var qtn = $("#question").val();
        var ans = $('input:text[name=answer]').val();
        var qId = $("#qId").val();
        var objectId = $("#objectId").val();
        $.post('/evaluateQuestion', {id: qId, objectId: objectId, answer: ans}, function(question) {
            $("#objectId").val(question._id);
            $("#qId").val(question.id);
            $('#question').html(question.question);
            $('input:text[name=answer]').val("");
        });
    });

});

