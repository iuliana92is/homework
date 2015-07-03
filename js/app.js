var iuliana = iuliana || {};

iuliana.tableGenerator= (function() {

        function tableConstruct () {

                var informationContentElements = document.getElementsByClassName("informationContent"); 
                var table = informationContentElements[0];
                var tableEditable = informationContentElements[1]; 
                var data = iuliana.data;
                var rows = '<div class="descriptionInformation">\
                        <ul>\
                            <li>Full Name</li>\
                            <li>Job Title</li>\
                            <li>Grade</li>\
                            <li>Allocation status</li>\
                            <li>Project</li>\
                            <li>Date of booking</li>\
                        </ul>\
                        <div class="clear"></div>\
                    </div>\
                ';
                for(var i = 0; i < data.length; i++) {
                    rows += '<div class="nameInformation">\
                        <ul>\
                            <li>' + data[i]["fullName"] + '</li>\
                            <li>' + data[i]["jobTitle"] + '</li>\
                            <li>' + data[i]["grade"] + '</li>\
                            <li>' + data[i]["allocationStatus"] + '</li>\
                            <li>' + data[i]["project"] + '</li>\
                            <li>' + data[i]["date"] + '</li>\
                            <img src="images/down.png" class="down">\
                            <img src="images/pencil.png" class="edit">\
                        </ul>\
                        <div class="clear"></div>\
                        <div class="moreInfo">\
                            <hr>\
                            <div class="infoText">\
                                <div class="infoTextItem">\
                                    <div class="leftText">Delivery Unit:</div>\
                                    <div class="rightText">' + data[i]["deliveryUnit"] + '</div>\
                                    <div class="clear"></div>\
                                    <div class="leftText">Date of start:</div>\
                                    <div class="rightText">' + data[i]["dateOfStart"] + '</div>\
                                    <div class="clear"></div>\
                                    <div class="leftText">Line manager:</div>\
                                    <div class="rightText">' + data[i]["lineManager"] + '</div>\
                                    <div class="clear"></div>\
                                    <div class="leftText">Project Manager </div>\
                                    <div class="rightText">' + data[i]["projectManager"] + '</div>\
                                    <div class="clear"></div>\
                                </div>\
        \
                            </div>\
        \
                            <div class="infoButton">\
                                <form>\
                                    <button type="submit" class="active"> Active button </button>\
                                    <button type="submit"> Inactive button </button>\
                                </form>\
                            </div>\
                            <div class="clear"></div>\
                        </div>\
                    </div>\
        \
                    <div class="clear"></div>\
        \
                    <hr>';
                } //for
                
                table.innerHTML = rows;//first table
                tableEditable.innerHTML = rows; //second table
                var elemListEdit = document.querySelectorAll('.down, .edit');
                
                for (var i = 0; i < elemListEdit.length; i++) {                     
                    elemListEdit[i].onclick = function(e) {
                        var moreInfoElement = e.target.parentNode.parentNode.children[2];
                        if(moreInfoElement.offsetParent != null) {
                            moreInfoElement.style.display = 'none';
                        } else {
                            moreInfoElement.style.display = 'block';
                        }
                    }
                }//for

        }//tableConstruct: function()

        function makeEditableTable (elementSelector) {
            tableConstruct();

            var rows = document.querySelectorAll(elementSelector + ' .nameInformation ul' );
            var childrenLi = [];
            for(var i = 0; i<rows.length;i++){
                childrenLi[i] = rows[i].querySelectorAll('li');
            }
            for(var i = 0;i<childrenLi.length;i++){
                for(var j = 0;j<childrenLi[i].length;j++){
                    var oldValue = childrenLi[i][j].textContent;
                    childrenLi[i][j].innerHTML = "<input type = 'text' value = '"+oldValue+"'>";
                }
            }
        }


        return {
            tableConstruct: tableConstruct, //fisrt table
            makeEditableTable : makeEditableTable //second table
        };//return

    }());
// console.log(functions);
//var test = new functions();
iuliana.tableGenerator.tableConstruct();
iuliana.tableGenerator.makeEditableTable('.editableTable');