var iuliana = iuliana || {};


iuliana.tableGenerator = (function() {
    function tableConstruct() {
        var table = $('.informationContent').first();
        var tableEditable = $('.informationContent.editableTable');
        var data = iuliana.data;
        table.append(
            $('<div></div>').addClass('descriptionInformation')
            .append($('<ul></ul>')
                .append($('<li></li>').text('Full Name'))
                .append($('<li></li>').text('Job Title'))
                .append($('<li></li>').text('Grade'))
                .append($('<li></li>').text('Allocation status'))
                .append($('<li></li>').text('Project'))
                .append($('<li></li>').text('Date of booking'))
            )
            .append($('<div></div>').addClass('clear'))
        );

        for (var i = 0; i < data.length; i++) {
            table.append(
                $('<div></div>').addClass('nameInformation')
                .append($('<ul></ul>')
                    .append($('<li></li>').text(data[i]["fullName"]))
                    .append($('<li></li>').text(data[i]["jobTitle"]))
                    .append($('<li></li>').text(data[i]["grade"]))
                    .append($('<li></li>').text(data[i]["allocationStatus"]))
                    .append($('<li></li>').text(data[i]["project"]))
                    .append($('<li></li>').text(data[i]["date"]))
                    .append($('<img>').addClass("down").attr({
                        src: "images/down.png"
                    }))
                    .append($('<img>').addClass("edit").attr({
                        src: "images/pencil.png"
                    }))
                    .append($('<img>').addClass("delete").attr({
                        src: "images/delete.png"
                    }))
                )


                .append($('<div></div>').addClass('clear'))
                .append($('<div></div>').addClass('moreInfo')
                    .append($('<hr>'))
                    .append($('<div></div>').addClass('infoText')
                        .append($('<div></div>').addClass('infoTextItem')
                            .append($('<div></div>').addClass('leftText').text('Delivery Unit:'))
                            .append($('<div></div>').addClass('rightText').text(data[i]["deliveryUnit"]))
                            .append($('<div></div>').addClass('clear'))
                            .append($('<div></div>').addClass('leftText').text('Date of start:'))
                            .append($('<div></div>').addClass('rightText').text(data[i]["dateOfStart"]))
                            .append($('<div></div>').addClass('clear'))
                            .append($('<div></div>').addClass('leftText').text('Line manager:'))
                            .append($('<div></div>').addClass('rightText').text(data[i]["lineManager"]))
                            .append($('<div></div>').addClass('clear'))
                            .append($('<div></div>').addClass('leftText').text('Project Manager:'))
                            .append($('<div></div>').addClass('rightText').text(data[i]["projectManager"]))
                            .append($('<div></div>').addClass('clear'))
                        )
                    )
                    .append($('<div></div>').addClass('infoButton')
                        .append($('<form></form>')
                            .append($('<button></button').addClass('active').text('Active button').attr({
                                type: 'submit'
                            }))
                            .append($('<button></button').text('Inactive button').attr({
                                type: 'submit'
                            }))
                        )
                    )
                    .append($('<div></div>').addClass('clear'))
                )
                .append($('<hr>'))
                .append($('<div></div>').addClass('clear'))
                


            );
        } //for

 


        tableEditable.html(table.html());
        var elemListEdit = document.querySelectorAll('.down, .edit');

        for (var i = 0; i < elemListEdit.length; i++) {
            elemListEdit[i].onclick = function(e) {
                var moreInfoElement = e.target.parentNode.parentNode.children[2];
                if (moreInfoElement.offsetParent != null) {
                    moreInfoElement.style.display = 'none';
                } else {
                    moreInfoElement.style.display = 'block';
                }
            }
        } //for

    } //tableConstruct: function()

    function makeEditableTable(elementSelector) {
        var rows = document.querySelectorAll(elementSelector + ' .nameInformation ul');
        var childrenLi = [];
        for (var i = 0; i < rows.length; i++) {
            childrenLi[i] = rows[i].querySelectorAll('li');
        }
        for (var i = 0; i < childrenLi.length; i++) {
            for (var j = 0; j < childrenLi[i].length; j++) {

                childrenLi[i][j].onclick = function(e) {
                    var oldValue = e.target.textContent;
                    e.target.innerHTML = "<input type = 'text' value = '" + oldValue + "'>";
                    var childNodes = e.target.childNodes;
                    childNodes[0].focus();

                    e.target.onblur = function(e2) {
                        e.target.parentNode.innerHTML = e2.target.value;
                    }
                }
            }
        }
        

        $('.delete').click(function() {
			$(this).parent().parent().remove();
		});
    }

    function tableFilter(table) {
        $('.filter input').keypress(function(e) {
            
            if (e.which == 13) {
                e.preventDefault();
                //$('#ghapidata').html('<div id="loader"><img src="images/loader.gif" alt="loading..."></div>');
                var filter = $(this).val().split(':');
                if (filter.length != 2) {
                    alert('Invalid input!  Try to white: Full Name, Job Title, Grade, Allocation status, Project, Date of booking');
                    return false;
                }

                var i = 0;
                $('.descriptionInformation li').each(function(index) {
                    if ($(this).html().toLowerCase() == filter[0].toLowerCase()) {

                        i = index + 1;
                        return false;
                    }
                });

                if (i == 0) {
                    alert('Column not found!');
                    return false;
                }

                if (filter[1].length && i) {
                    $(table).find('.nameInformation li:nth-of-type(' + i + ')').each(function() {
                        if ($(this).html().toLowerCase().indexOf(filter[1].toLowerCase()) >= 0) {
                            console.log($(this).parent().parent());
                            $(this).parent().parent().show();
                        } else {
                            $(this).parent().parent().hide(1000);
                        }
                    });
                } else {
                    $(table).find(".nameInformation").hide();
                }
                return false;
            }
        });
    }

    function newEmployee(table){





    }

    function saveDataFromTable(table) {
	    var data = [];
	    var fullNames = [];
	    //validate by name to be unique
	    table.find('.fullName').each(function() {
	        var value = $(this).html()
	        if ($.inArray(value, fullNames) != -1) {
	            alert('Duplicate full names in table!');
	            return false;
	        }
	        fullNames.push($(this).html());
	    });


	    table.find('.nameInformation').each(function() {
	        data.push({
				fullName: $(this).find('.fullName').html(),
				deliveryUnit: $(this).find('.deliveryUnit').html(),
				dateOfStart: $(this).find('.dateOfStart').html(),
				lineManager: $(this).find('.lineManager').html(),
				projectManager: $(this).find('.projectManager').html(),
				jobTitle: $(this).find('.jobTitle').html(),
				grade: $(this).find('.grade').html(),
				allocationStatus: $(this).find('.allocationStatus').html(),
				project: $(this).find('.project').html(),
				date: $(this).find('.date').html()
	      	});
	    });
	}


    // function CheckBrowser() {
    //     if ('localStorage' in window && window['localStorage'] !== null) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
	

    return {
        tableConstruct: tableConstruct,
        makeEditableTable: makeEditableTable,
        tableFilter: tableFilter,
        saveDataFromTable : saveDataFromTable

    }; //return



}());
iuliana.data = data;

// iuliana.data = localStorage.data;

iuliana.tableGenerator.tableConstruct();
iuliana.tableGenerator.makeEditableTable('.editableTable');
iuliana.tableGenerator.tableFilter('.editableTable');
// iuliana.tableGenerator.tableFilter('.informationContent');