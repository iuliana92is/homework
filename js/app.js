var iuliana = iuliana || {};


iuliana.tableGenerator= (function() {
        function tableConstruct () {
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

                for(var i = 0; i < data.length; i++) {
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

        //         var rows = '<div class="descriptionInformation">\
        //                 <ul>\
        //                     <li>Full Name</li>\
        //                     <li>Job Title</li>\
        //                     <li>Grade</li>\
        //                     <li>Allocation status</li>\
        //                     <li>Project</li>\
        //                     <li>Date of booking</li>\
        //                 </ul>\
        //                 <div class="clear"></div>\
        //             </div>\
        //         ';
        //         for(var i = 0; i < data.length; i++) {
        //             rows += '<div class="nameInformation">\
        //                 <ul>\
        //                     <li>' + data[i]["fullName"] + '</li>\
        //                     <li>' + data[i]["jobTitle"] + '</li>\
        //                     <li>' + data[i]["grade"] + '</li>\
        //                     <li>' + data[i]["allocationStatus"] + '</li>\
        //                     <li>' + data[i]["project"] + '</li>\
        //                     <li>' + data[i]["date"] + '</li>\
        //                     <img src="images/down.png" class="down">\
        //                     <img src="images/pencil.png" class="edit">\
        //                 </ul>\
        //                 <div class="clear"></div>\
        //                 <div class="moreInfo">\
        //                     <hr>\
        //                     <div class="infoText">\
        //                         <div class="infoTextItem">\
        //                             <div class="leftText">Delivery Unit:</div>\
        //                             <div class="rightText">' + data[i]["deliveryUnit"] + '</div>\
        //                             <div class="clear"></div>\
        //                             <div class="leftText">Date of start:</div>\
        //                             <div class="rightText">' + data[i]["dateOfStart"] + '</div>\
        //                             <div class="clear"></div>\
        //                             <div class="leftText">Line manager:</div>\
        //                             <div class="rightText">' + data[i]["lineManager"] + '</div>\
        //                             <div class="clear"></div>\
        //                             <div class="leftText">Project Manager </div>\
        //                             <div class="rightText">' + data[i]["projectManager"] + '</div>\
        //                             <div class="clear"></div>\
        //                         </div>\
        // \
        //                     </div>\
        // \
        //                     <div class="infoButton">\
        //                         <form>\
        //                             <button type="submit" class="active"> Active button </button>\
        //                             <button type="submit"> Inactive button </button>\
        //                         </form>\
        //                     </div>\
        //                     <div class="clear"></div>\
        //                 </div>\
        //             </div>\
        // \
        //             <div class="clear"></div>\
        // \
        //             <hr>';
        //         } //for


                //table drop details content
                tableEditable.html(table.html());
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


        //tabel 2 with input text
        function makeEditableTable (elementSelector) {
            var rows = document.querySelectorAll(elementSelector + ' .nameInformation ul' );
            var childrenLi = [];
            for(var i = 0; i<rows.length;i++){
                childrenLi[i] = rows[i].querySelectorAll('li');
            }
            for(var i = 0;i<childrenLi.length;i++){
                for(var j = 0;j<childrenLi[i].length;j++){
                    
					childrenLi[i][j].onclick = function(e) {
						var oldValue = e.target.textContent;
						e.target.innerHTML = "<input type = 'text' value = '"+oldValue+"'>";
						
						e.target.onfocus = function(e2) {
							e.target.parentNode.innerHTML = e2.target.value;
						}
					}
                }
            }
        }

		function tableFilter(table) {
			$('.filter input').keyup( function () {			
				var filter = $(this).val();
				if(filter) {
				  $(table).find(".nameInformation li:not(:contains(" + filter + "))").parent().parent().hide();
				  $(table).find(".nameInformation li:contains(" + filter + ")").parent().parent().show();
				  // $(table).find(".nameInformation li:first-child:not(:contains(" + filter + "))").parent().parent().slideUp();
				  // $(table).find(".nameInformation li:first-child:contains(" + filter + ")").parent().parent().slideDown();
				} else {
				  $(table).find(".nameInformation").show();
				}
				return false;
			  });
		  }




		

        return {
            tableConstruct: tableConstruct,
            makeEditableTable : makeEditableTable,
			tableFilter: tableFilter
        };//return

    }());
iuliana.data = data;

iuliana.tableGenerator.tableConstruct();
iuliana.tableGenerator.makeEditableTable('.editableTable');
iuliana.tableGenerator.tableFilter('.informationContent');
// iuliana.tableGenerator.tableFilter('.nameInformation');