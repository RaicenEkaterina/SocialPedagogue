
$(function () {
    var operation = "A"; //"A"=Adding; "E"=Editing

    var selected_index = -1;

    var tbClients = localStorage.getItem("tbClients");

    tbClients = JSON.parse(tbClients);

    if (tbClients == null)
        tbClients = [];


    function Add() {

        var client = {
            ID: $("#txtID").val(),
            FIO_ych: $("#txtFIO").val(),
            Data: $("#datepicker").val(),
            Klass: $("#txtklass").val(),
            Dom_ad: $("#txtdom").val()
        };

        tbClients.push(client);
        localStorage.setItem("tbClients", JSON.stringify(tbClients));
        alert("Data Saved Successfully.");
        return true;

    }

    function Edit() {
        tbClients[selected_index] = {
            ID: $("#txtID").val(),
            FIO_ych: $("#txtFIO").val(),
            Data: $("#datepicker").val(),
            Klass: $("#txtklass").val(),
            Dom_ad: $("#txtdom").val()
        };
        localStorage.setItem("tbClients", JSON.stringify(tbClients));
        alert("The data was edited.")
        operation = "A";
        return true;
    }

    function Delete() {
        tbClients.splice(selected_index, 1);
        localStorage.setItem("tbClients", JSON.stringify(tbClients));
        alert("Record deleted.");
    }

    function List() {
        $("#tblList").html("");
        $("#tblList").html(
            "<thead>" +
            "	<tr>" +
            "	<th></th>" +
            "	<th>ID</th>" +
            "	<th>ФИО учащегося</th>" +
            "	<th>Дата рождения</th>" +
            "	<th>Класс</th>" +
            "   <th>Домашний адрес</th>" +
            "	</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
        );
        for (var i in tbClients) {
            var cli = tbClients[i];
            $("#tblList tbody").append("<tr>" +
                "	<td><img src='js/edit.png' alt='Edit" + i + "' class='btnEdit'/><img src='js/delete.png' alt='Delete" + i + "' class='btnDelete'/></td>" +
                "	<td>" + cli.ID + "</td>" +
                "	<td>" + cli.FIO_ych + "</td>" +
                "	<td>" + cli.Data + "</td>" +
                "	<td>" + cli.Klass + "</td>" +
                "	<td>" + cli.Dom_ad + "</td>" +
                "</tr>");
        }
    }

    $("#frmRegister").bind("submit", function () {
        if (operation == "A")
            return Add();
        else
            return Edit();
    });

    List();

    $(".btnEdit").bind("click", function () {

        operation = "E";
        selected_index = parseInt($(this).attr("alt").replace("Edit", ""));

        var cli = tbClients[selected_index];
        $("#txtID").val(cli.ID);
        $("#txtFIO").val(cli.FIO_ych);
        $("#datepicker").val(cli.Data);
        $("#txtklass").val(cli.Klass);
        $("#txtdom").val(cli.Dom_ad);

        $("#txtID").attr("readonly", "readonly");
        $("#txtFIO").focus();
    });

    $(".btnDelete").bind("click", function () {
        selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
        Delete();
        List();
    });

    $("#btnSearch").bind("click", function () {
        //alert("I m in search");
        var searchtext = $("#txtSearch").val();
        List();
    });
});