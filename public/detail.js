
/**
 * Created by petio on 4.1.2017 г..
 */

(function ($) {
    $(document).ready(function() {
        $(".btn.btn-lg.btn-success").click(function () {
            var id = $(this).attr('id');
            $(this).hide();
            console.log("join");
            $.ajax({
                type: "POST",
                url: "/events/join",
                data: {'id':id},
                success: function (data) {
                    console.log(data)
                },
                dataType: "JSON"
            })
        });
        $(".btn.btn-lg.btn-warning").click(function () {
            var id = $(this).attr('id');
            $(this).hide();
            console.log("leave");
            $.ajax({
                type: "POST",
                url: "/events/leave",
                data: {'id':id},
                success: function (data) {
                    console.log(data)
                },
                dataType: "JSON"
            })
        });
        $(".btn.btn-lg.btn-primary").click(function () {
            var id = $(this).attr('id');
            $(this).hide();
            console.log("delete");
            $.ajax({
                type: "POST",
                url: "/events/delete/"+id,
                success: function (data) {

                },
                dataType: "JSON"
            })
            window.location.replace("/events/active");


        });
    });

})(jQuery);