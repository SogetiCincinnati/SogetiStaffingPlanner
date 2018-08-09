/* that file contains AJAX function calls related to Opportunity.js. 
The 'that' context of that file is being passed to these functions as the parameter, 'that' 
*/
let requests = {

    getRegionList: function (that) {
        $.ajax({ // Region List
            async: false,
            cache: false,
            type: "GET",
            url: "GetRegionList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                that.regions = data;
            }.bind(that),
            error: function (e) {
                console.log(e);
            }
        });
    },
    getAEList: function (that) {
        $.ajax({ // AE list
            async: false,
            cache: false,
            type: "GET",
            url: "GetAEList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                that.aes = data;
            }.bind(that),
            error: function (e) {
                console.log(e);
            }
        });
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
    getSoldStatusList: function (that) {
        $.ajax({ // sold status list
            async: false,
            cache: false,
            type: "GET",
            url: "GetSoldStatusList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                that.soldStatuses = data;
            }.bind(that),
            error: function (e) {
                console.log(e);
            }
        });
    },
    getACTLeadList: function (that) {
        $.ajax({ // ACT LEAD aka opportunity owner
            async: false,
            cache: false,
            type: "GET",
            url: "GetACTLeadList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                that.ACTLeads = data;
            }.bind(that),
            error: function (e) {
                console.log(e);
            }
        });
    },
    getUnitList: function (that) {
        // GET UNIT LIST
        $.ajax({
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
    getClientList: function (that) {
        
        // GET CLIENT LIST
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "GetClientList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                
                that.clients = data;
                console.log(that.clients);
            }.bind(that)
        });
    },
    getOpportunityList: function (that) {
        // GET OPPORTUNITY LIST
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "GetOpportunities",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                var result = data.sort(function (a, b) {
                    return b.active - a.active;
                });
                that.opportunities = data;
                console.log('opportunities', that.opportunities);
            }.bind(that)
        });
    },
    editOpportunity: function (data, that) {
        $.ajax({
            type: "POST",
            url: "EditPost",
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                that.opportunities.push(data);
                /* that code will update the table.  It needs to be in it's own function */
                requests.getOpportunityList(that);
                requests.getClientList(that);
                requests.getUnitList(that);
                that.findSelected();
                that.scrollDown();
                that.clearForm();
                requests.updateMessage(that.opporunityName, that);
            }.bind(that),
            error: function (e) {
                console.log(e);
                console.log(e, "Error adding data! Please try again.");
            }
        });
    },
    addOpportunity: function (data, that) {
        $.ajax({
            type: "POST",
            url: "AddOpportunity",
            dataType: "json",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                that.opportunities.push(data);
                requests.getOpportunityList(that);
                that.findSelected();
                that.scrollDown();
                that.clearForm();
                requests.addMessage(data.opportunityName, that);
            }.bind(that),
            error: function (e) {
                console.log(e);
                console.log(e, "Error adding data! Please try again.");
            }
        });
    },
    quickAddClient: function (quickClient, that) {
        $.ajax({
            type: "POST",
            url: "../Client/AddClient",
            dataType: "json",
            data: JSON.stringify(quickClient),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                //Receives message from backend for you to do what you want with it
                console.log('POST request success');
                requests.addMessage('new client ' + that.formData.clientName, that);
                that.state.clientQuickAdd = false;
                requests.getClientList(this);
                console.log('CLIENTS', that.clients);
                for (let i = 0; i < that.clients.length; i++) {
                    if (quickClient.clientName == that.clients[i].ClientName) {
                        console.log('MATCH', that.clients[i]);
                        that.clientId = that.clients[i].ClientId;
                        console.log(that.clientId);
                    } 
                }
            }.bind(that),
            error: function (e) {
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
    },
    toggleActive: function (that) {
        let oppObj = {};
        oppObj.id = that.opportunityDetail.opportunityId;
        oppObj.opportunityName = that.opportunityDetail.opportunityName;
        oppObj.opportunityNotes = that.opportunityDetail.opportunityNotes;
        oppObj.clientContact = that.opportunityDetail.clientContact;
        oppObj.clientId = that.opportunityDetail.clientId;
        oppObj.accountExecutiveUserId = that.opportunityDetail.accountExecutiveUserId;
        oppObj.unitId = that.opportunityDetail.unitId;
        oppObj.regionId = that.opportunityDetail.regionId;
        oppObj.soldStatusId = that.opportunityDetail.soldStatusId;
        oppObj.opportunityOwnerUserId = that.opportunityDetail.opportunityOwnerUserId;
        oppObj.active = !that.opportunityDetail.active;
        
        $.ajax({
            type: "POST",
            url: "EditPost",
            dataType: "json",
            data: JSON.stringify(oppObj),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                /* that code will update the table.  It needs to be in it's own function */
                requests.getOpportunityList(that);
                requests.getClientList(that);
                requests.getUnitList(that);
                requests.updateMessage(that.opportunityName, that);
                console.log('UPDATED!');
                console.log(res);
                console.log(that.opportunityDetail.active);
                that.opportunityDetail.active = oppObj.active;
            }.bind(that),
            error: function (e) {
                console.log(e);
                console.log(e, "Error adding data! Please try again.");
            }
        });
    }
}