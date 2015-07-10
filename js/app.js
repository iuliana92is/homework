var iuliana = iuliana || {};


iuliana.tableGenerator = (function() {
    function addRow(element, data, index) {                
        element.append(
            $('<div></div>').addClass('nameInformation')
            .append($('<ul></ul>')
                .append($('<li></li>').addClass('fullName').text(data.fullName))
                .append($('<li></li>').addClass('jobTitle').text(data.jobTitle))
                .append($('<li></li>').addClass('grade').text(data.grade))
                .append($('<li></li>').addClass('allocationStatus').text(data.allocationStatus))
                .append($('<li></li>').addClass('project').text(data.project))
                .append($('<li></li>').addClass('date').text(data.date))
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
                        .append($('<div></div>').addClass('rightText').addClass('deliveryUnit').text(data.deliveryUnit))
                        .append($('<div></div>').addClass('clear'))
                        .append($('<div></div>').addClass('leftText').text('Date of start:'))
                        .append($('<div></div>').addClass('rightText').addClass('dateOfStart').text(data.dateOfStart))
                        .append($('<div></div>').addClass('clear'))
                        .append($('<div></div>').addClass('leftText').text('Line manager:'))
                        .append($('<div></div>').addClass('rightText').addClass('lineManager').text(data.lineManager))
                        .append($('<div></div>').addClass('clear'))
                        .append($('<div></div>').addClass('leftText').text('Project Manager:'))
                        .append($('<div></div>').addClass('rightText').addClass('projectManager').text(data.projectManager))
                        .append($('<div></div>').addClass('clear'))
                    )
                )
                .append($('<div></div>').addClass('infoButton')
                    .append($('<form></form>')
                        .append($('<button></button').addClass('active').text('Active button'))
                        .append($('<button></button').text('Inactive button'))
                    )
                )
                .append($('<div></div>').addClass('clear'))
            )
            .append($('<hr>'))
            .append($('<div></div>').addClass('clear'))
        );
        
        var elemListEdit = document.querySelectorAll('.down, .edit');

        for (var i = 0; i < elemListEdit.length; i++) {
            elemListEdit[i].onclick = function(e) {
                var moreInfoElement = e.target.parentNode.parentNode.children[2];
                if (moreInfoElement.offsetParent !== null) {
                    moreInfoElement.style.display = 'none';
                } else {
                    moreInfoElement.style.display = 'block';
                }
            };
        } //for
    }
    
    function tableConstruct(table) {
        //var table = $();
        //var tableEditable = $('.informationContent.editableTable');
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
            iuliana.tableGenerator.addRow(table, data[i], i);
        } //for
        
        //tableEditable.html(table.html());//clone
        table
            .after($('<button></button').text('New employee').addClass('newEmployee'))
            .after($('<button></button').text('Save data').addClass('saveData'));
        /*tableEditable
            .after($('<button></button').text('New employee').addClass('newEmployee'))
            .after($('<button></button').text('Save data').addClass('saveData'));*/
        
        
        //save data button
        //console.log(table.parent().find('.saveData'));
        table.parent().find('.saveData').click(function() {
            iuliana.tableGenerator.saveDataFromTable(table, true);
        });
        
        $('.newEmployee').click(function() {
            var newEmployee = {
                fullName: "Test",
                deliveryUnit: "Test",
                dateOfStart: "12 / 03 / 2015",
                lineManager: "Test",
                projectManager: "Test",
                jobTitle: "Test",
                grade: "Test",
                allocationStatus: "Test",
                project: "Test",
                date: "10/05/2014"
            };               
            
            iuliana.tableGenerator.addRow(table, newEmployee);
            iuliana.tableGenerator.makeEditableTable('.editableTable');
        });  
        $('.delete').click(function(e) {
                var parent = e.target.parentElement.parentElement;
                var rowIndex = parent.getAttribute('data-row');
                parent.remove();
                iuliana.tableGenerator.saveDataFromTable(table, false);
                //$root.find('.nameinformation');
                console.log(rowIndex);
            //$(this).parent().parent().remove();

        });
    } //tableConstruct: function()

    function makeEditableTable(elementSelector) {
    
    
        var childrenLi = rowsEditable(elementSelector);
        
        for ( i = 0, len = childrenLi.length; i < len ; i++) {
            for (var j = 0; j < childrenLi[i].length; j++) {

                test(childrenLi[i][j]);
            }
        }
    }


    function rowsEditable(elementSelector) {
        var rows = document.querySelectorAll(elementSelector + ' .nameInformation ul'),
            childrenLi = [];
        for (var i = 0, len =  rows.length; i < len ; i++) {
            childrenLi[i] = rows[i].querySelectorAll('li');
        }

        return childrenLi;

    }

    var test = function(el) {
            el.onclick = function(e) {
                    var oldValue = e.target.textContent;
                    e.target.innerHTML = "<input type = 'text' value = '" + oldValue + "'>";
                    var childNodes = e.target.childNodes;
                    childNodes[0].focus();

                    e.target.onblur = function(e2) {
                        e.target.parentNode.innerHTML = e2.target.value;
                    };
                };
        };



    function tableFilter(table) {
        $('.filter input').keypress(function(e) {
            var regex = new RegExp("^[a-zA-Z0-9:/._ ]+$");
            var enteredValueCode = !e.charCode ? e.which : e.charCode;
            var enteredValue = String.fromCharCode(enteredValueCode);

            if (enteredValueCode != 13 && !regex.test(enteredValue)) {
                return false;
            }
            //if enter pressed
            if (e.which == 13) {
                //e.preventDefault - stop submiting the form
                e.preventDefault();
                var filter = $(this).val().split(': ');
                if (filter.length != 2) {
                    alert('Invalid input!');
                    return false;
                }

                //find column based on first part of string
                var i = 0;
                $('.descriptionInformation li').each(function(index) {
                    if ($(this).html().toLowerCase() == filter[0].toLowerCase()) {
                        //we found the column and we can exit. "i" will keep the column number
                        i = index + 1;
                        return false;
                    }
                });

                
                if (filter[1].length && i) {
                    $(table).find('.nameInformation li:nth-of-type(' + i + ')').each(function() {
                        if ($(this).html().toLowerCase().indexOf(filter[1].toLowerCase()) >= 0) {
                            $(this).parent().parent().show();
                        } else {
                            $(this).parent().parent().hide(500);
                        }
                    });
                } else {
                    $(table).find(".nameInformation").hide();
                }
                return false;
            }
        });
    }

    function saveDataFromTable(table, warning) {
        var data = [];
   
        
        //build data from table
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
        
        setLsData('data', data);
        //localStorage.data  conversion
        if(warning) {
            alert('Data saved in local storage!');
        }
    }

    function getLsData(key){
        var data = JSON.parse(localStorage.getItem(key));
        //console.log(data);
        return data;
    }

    function setLsData(key, value){
        var data = JSON.stringify(value);
        localStorage.setItem(key, data);
    }



    return {
        tableConstruct: tableConstruct,
        makeEditableTable: makeEditableTable,
        tableFilter: tableFilter,
        saveDataFromTable: saveDataFromTable,
        addRow: addRow,
        getLsData : getLsData
    }; //return



}());

iuliana.data = localStorage.data ? JSON.parse(localStorage.data) : [];
//iuliana.data = iuliana.tableGenerator.getLsData('data');
iuliana.tableGenerator.tableConstruct($('.firstTable'));
iuliana.tableGenerator.tableConstruct($('.editableTable'));
iuliana.tableGenerator.makeEditableTable('.editableTable');
iuliana.tableGenerator.tableFilter('.editableTable');
