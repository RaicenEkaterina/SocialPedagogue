
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
            FIO_m: $("#txtFIO_m").val(),
            FIO_o: $("#txtFIO_o").val(),
            Mest_rab_m: $("#txtmest_m").val(),
            Mest_rab_o: $("#txtmest_o").val(),
            Primechanie: $("#txtprim").val()
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
            FIO_m: $("#txtFIO_m").val(),
            FIO_o: $("#txtFIO_o").val(),
            Mest_rab_m: $("#txtmest_m").val(),
            Mest_rab_o: $("#txtmest_o").val(),
            Primechanie: $("#txtprim").val()

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
            "	<th>ФИО матери/матчихи</th>" +
            "	<th>ФИО отца/отчима</th>" +
            "   <th>Место работы матери/матчихи</th>" +
            "	<th>Место работы отца/отчима</th>" +
            "	<th>Примечание</th>" +
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
                "	<td>" + cli.FIO_m + "</td>" +
                "	<td>" + cli.FIO_o + "</td>" +
                "	<td>" + cli.Mest_rab_m + "</td>" +
                "	<td>" + cli.Mest_rab_o + "</td>" +
                "	<td>" + cli.Primechanie + "</td>" +
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
        $("#txtFIO_m").val(cli.FIO_m);
        $("#txtFIO_o").val(cli.FIO_o);
        $("#txtmest_m").val(cli.Mest_rab_m);
        $("#txtmest_o").val(cli.Mest_rab_o);
        $("#txtprim").val(cli.Primechanie);

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