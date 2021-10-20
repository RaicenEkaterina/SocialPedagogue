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
            FIO_rod: $("#txtFIO_rod").val(),
            Ad_prog: $("#txtdom").val(),
            Mest_rab: $("#txtmest_rab").val(),
            Kategoria: $("#txtkat").val(),
            FIO_ych: $("#txtFIO").val(),
            Zanatost: $("#txtzan").val(),
            Data_postan: $("#txtdata").val(),
            Prichina: $("#txtprich").val(),
            Sistema: $("#txtsist").val(),
            Data_s_ych: $("#txtdat").val(),
        };

        tbClients.push(client);
        localStorage.setItem("tbClients", JSON.stringify(tbClients));
        alert("Data Saved Successfully.");
        return true;

    }

    function Edit() {
        tbClients[selected_index] = {
            ID: $("#txtID").val(),
            FIO_rod: $("#txtFIO_rod").val(),
            Ad_prog: $("#txtdom").val(),
            Mest_rab: $("#txtmest_rab").val(),
            Kategoria: $("#txtkat").val(),
            FIO_ych: $("#txtFIO").val(),
            Zanatost: $("#txtzan").val(),
            Data_postan: $("#txtdata").val(),
            Prichina: $("#txtprich").val(),
            Sistema: $("#txtsist").val(),
            Data_s_ych: $("#txtdat").val(),
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
            "	<th>Фио родителей</th>" +
            "	<th>Адрес проживания</th>" +
            "	<th>Место работы</th>" +
            "   <th>Категория семьи</th>" +
            "	<th>ФИО учащегося</th>" +
            "	<th>Занятость</th>" +
            "	<th>Дата постановки на учет</th>" +
            "	<th>Причина</th>" +
            "	<th>Система профилактических мер</th>" +
            "	<th>Дата снятия с учет</th>" +
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
                "	<td>" + cli.FIO_rod + "</td>" +
                "	<td>" + cli.Ad_prog + "</td>" +
                "	<td>" + cli.Mest_rab + "</td>" +
                "	<td>" + cli.Kategoria + "</td>" +
                "	<td>" + cli.FIO_ych + "</td>" +
                "	<td>" + cli.Zanatost + "</td>" +
                "	<td>" + cli.Data_postan + "</td>" +
                "	<td>" + cli.Prichina + "</td>" +
                "	<td>" + cli.Sistema + "</td>" +
                "	<td>" + cli.Data_s_ych + "</td>" +
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
        $("#txtFIO_rod").val(cli.FIO_rod);
        $("#txtdom").val(cli.Ad_prog);
        $("#txtmest_rab").val(cli.Mest_rab);
        $("#txtkat").val(cli.Kategoria);
        $("#txtFIO").val(cli.FIO_ych);
        $("#txtzan").val(cli.Zanatost);
        $("#txtdata").val(cli.Data_postan);
        $("#txtprich").val(cli.Prichina);
        $("#txtsist").val(cli.Sistema);
        $("#txtdat").val(cli.Data_s_ych);

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