
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
            God_ych: $("#txtgod").val(),
            Data_ych: $("#txtdata").val(),
            FIO_ych: $("#txtFIO").val(),
            Data_rog: $("#datepicker").val(),
            Svediay: $("#txtsved").val(),
            Prichina: $("#txtprich").val(),
            Data_s_ych: $("#txtdat").val()
        };

        tbClients.push(client);
        localStorage.setItem("tbClients", JSON.stringify(tbClients));
        alert("Data Saved Successfully.");
        return true;

    }

    function Edit() {
        tbClients[selected_index] = {
            ID: $("#txtID").val(),
            God_ych: $("#txtgod").val(),
            Data_ych: $("#txtdata").val(),
            FIO_ych: $("#txtFIO").val(),
            Data_rog: $("#datepicker").val(),
            Svediay: $("#txtsved").val(),
            Prichina: $("#txtprich").val(),
            Data_s_ych: $("#txtdat").val()
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
            "	<th>Год постановки на учет</th>" +
            "	<th>Дата постановки на учет</th>" +
            "	<th>ФИО учащегося</th>" +
            "   <th>Дата рождения</th>" +
            "	<th>Сведенья о родителях</th>" +
            "	<th>Причина постановки на учет</th>" +
            "	<th>Дата снятия с учета</th>" +
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
                "	<td>" + cli.God_ych + "</td>" +
                "	<td>" + cli.Data_ych + "</td>" +
                "	<td>" + cli.FIO_ych + "</td>" +
                "	<td>" + cli.Data_rog + "</td>" +
                "	<td>" + cli.Svediay + "</td>" +
                "	<td>" + cli.Prichina + "</td>" +
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
        $("#txtgod").val(cli.God_ych);
        $("#txtdata").val(cli.Data_ych);
        $("#txtFIO").val(cli.FIO_ych);
        $("#datepicker").val(cli.Data_rog);
        $("#txtsved").val(cli.Svediay);
        $("#txtprich").val(cli.Prichina);
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