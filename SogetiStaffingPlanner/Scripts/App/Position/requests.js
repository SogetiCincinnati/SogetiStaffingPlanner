/* that object contains methods that perform varios AJAX requests to the controller. */
/* Note that the that context is being passed in to these as the parameter 'that'.  */

let requests = {
    fetchPositions: function (that) {
        $.ajax({ // get positions
            async: false,
            cache: false,
            type: "GET",
            url: "GetPosition",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                that.positions = data;
            }.bind(that),
            error: function (e) {
                console.log(e);
            }
        })
    },
    getUserList: function (that) {
        $.ajax({ // User list
            async: false,
            cache: false,
            type: "GET",
            url: "GetUserList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                that.users = data;
            }.bind(that),
            error: function (e) {
                console.log(e);
            }
        });
    },
    getOpportunityList: function (that) {
        $.ajax({ // get opportunity list
            async: false,
            cache: false,
            type: "GET",
            url: "GetOpportunityList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                that.opportunities = data;
            }.bind(that)
        });
    },
    getUnitList: function (that) {
        $.ajax({ // get Unit list
            async: false,
            cache: false,
            type: "GET",
            url: "GetUnitList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                that.units = data;
            }.bind(that)
        });
    },
    getPositionStatusList: function (that) {
        $.ajax({ // Get Position Status List 
            async: false,
            cache: false,
            type: "GET",
            url: "GetPositionStatusList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                that.positionStatuses = data;
            }.bind(that)
        });
    },
    getGradeList: function (that) {
        $.ajax({ // Get Grade List 
            async: false,
            cache: false,
            type: "GET",
            url: "GetGradeList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                that.grades = data;
            }.bind(that)
        });
    },
    // Add a position
    postPosition: function (data, that) {
        $.ajax({
            type: "POST",
            url: "AddPosition",
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                that.findSelected();
                that.scrollDown();
                //Receives message from backend for you to do what you want with it
                requests.fetchPositions(that);
                console.log('POST request success');
                requests.addMessage(data.positionName, this);
                
                posHelpers.clearForm(that);
            }.bind(that),
            error: function (e) {
                console.log(e);
                console.log(e, "Error adding data! Please try again.");
            }
        });
    },
    editPosition: function (data, that) {
        $.ajax({
            type: "POST",
            url: "EditPosition",
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                for (position in that.positions) { // Highlights the updated row

                    if (that.positions[position].PositionName == that.positionName &&
                        that.positions[position].OpportunityId == that.opportunityId) {
                        that.selected = position;
                    }
                }
                //Receives message from backend for you to do what you want with it   
                requests.updateMessage(that.positionName, this);
                that.findSelected();
                posHelpers.clearForm(that);
                requests.fetchPositions(that);
               

            }.bind(that),
            error: function (e) {
                console.log(e);
                console.log(e, "Error adding data! Please try again.");
            }
        });
    },
    addMessage: function (message, that) {
        setTimeout(function () {
            that.message = '';
        }, 6000);
        that.message = `Added ${message}!`;
    },
    updateMessage: function (message, that) {
        setTimeout(function () {
            that.message = '';
        }, 6000);
        that.message = `Updated ${message}!`;
    }
};