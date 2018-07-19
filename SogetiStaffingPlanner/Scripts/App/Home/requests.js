// requests for practice manager view

let requests = {
    getPositionStatusList: function (that) {
        $.ajax({ // Get Position Status List 
            async: false,
            cache: false,
            type: "GET",
            url: "Position/GetPositionStatusList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                that.positionStatuses = data;
            }.bind(that)
        });
    },
    getUnitList: function (that) {
        // GET UNIT LIST
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "Opportunity/GetUnitList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                that.units = data;

            }.bind(that)
        });
    },
    getAEList: function (that) {
        $.ajax({ // AE list
            async: false,
            cache: false,
            type: "GET",
            url: "Opportunity/GetAEList",
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
    getRegionList: function (that) {
        $.ajax({ // Region List
            async: false,
            cache: false,
            type: "GET",
            url: "Opportunity/GetRegionList",
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
    fetchClients: function (that) {    
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "Client/GetClients",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
               
                function compare(a, b) {
                    if (a.ClientName.toUpperCase() < b.ClientName.toUpperCase())
                        return -1;
                    if (a.ClientName.toUpperCase() > b.ClientName.toUpperCase())
                        return 1;
                    return 0;
                }

                data.sort(compare);
                that.clients = data;
                //that.findSelected();
                //that.scrollDown();
                console.log(that.clients);
            }.bind(that)
        });
    },
    editClient: function (that) {
        console.log('editing')
        $.ajax({
            type: "POST",
            url: "Client/EditClient",
            dataType: "json",
            data: JSON.stringify(that.formData),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                //Receives message from backend for you to do what you want with it
                console.log('POST request success');
                that.states.addState = false;
                that.states.updateState = false;
                requests.fetchClients(that);
                requests.updateMessage(that.formData.clientName, that);
            }.bind(that),
            error: function (e) {
                console.log(e, "Error adding data! Please try again.");
            }
        });
    },
    addClient: function (that) {
        $.ajax({
            type: "POST",
            url: "Client/AddClient",
            dataType: "json",
            data: JSON.stringify(that.formData),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                //Receives message from backend for you to do what you want with it
                that.addState = false;
                requests.addMessage(that.formData.clientName, that);
            }.bind(that),
            error: function (e) {
                console.log(e, "Error adding data! Please try again.");
            }
        });
    },
    addOpportunity: function (data, that) {
        $.ajax({
            type: "POST",
            url: "Opportunity/AddOpportunity",
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
    addRow: function (client, that) {
        $.ajax({
            type: "POST",
            url: "Client/AddClient",
            dataType: "json",
            data: JSON.stringify(client),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                //Receives message from backend for you to do what you want with it
                that.addState = false;
                requests.addMessage(that.formData.clientName, that);
                $.ajax({
                    async: false,
                    cache: false,
                    type: "GET",
                    url: "Client/GetClients",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        console.log('return', data);
                        that.clients = data;
                        function findRecentClient(data) {
                            let max = 0;
                            jQuery.map(data, function (obj) {
                                if (obj.ClientId > max)
                                    max = obj.ClientId;
                            });
                            return max;
                        }
                        that.state.lastClientId = findRecentClient(data);
                        let oppObj = {
                            clientId: that.state.lastClientId,
                            accountExecutiveUserId: that.formData.accountExecutiveUserId,
                            unitId: that.formData.unitId,
                            regionId: that.formData.regionId,
                            opportunityName: that.formData.opportunityName,
                            opportunityNotes: that.formData.opportunityNotes,
                            clientContact: that.formData.clientContact
                        }
                        
                        $.ajax({
                            type: "POST",
                            url: "Opportunity/AddOpportunity",
                            dataType: "json",
                            data: JSON.stringify(oppObj),
                            contentType: "application/json; charset=utf-8",
                            success: function (res) {
                                $.ajax({
                                    async: false,
                                    cache: false,
                                    type: "GET",
                                    url: "Opportunity/GetOpportunities",
                                    contentType: "application/json;charset=utf-8",
                                    dataType: "json",
                                    success: function (data) {
                                        that.opportunities = data;
                                        console.log(data[data.length - 1].opportunityId);
                                        let posObj = {
                                            opportunityId: data[data.length - 1].opportunityId,
                                            unitPracticeId: 4,
                                            positionName: that.formData.positionName,
                                            numberOfPositions: that.formData.numberOfPositions,
                                            skillset: that.formData.skillset,
                                            hireCandidate: that.formData.hireCandidate,
                                            proposedCandidate: that.formData.proposedCandidate,
                                            rejectedCandidate: that.formData.rejectedCandidate,
                                            acceptedCandidate: that.formData.acceptedCandidate,
                                            positionNote: that.formData.positionNote,
                                            lastModifiedUserId: 1,
                                            lastModified: new Date(),
                                            active: true,
                                            positionStatusId: that.formData.positionStatusId
                                        };
                                        $.ajax({
                                            type: "POST",
                                            url: "Position/AddPosition",
                                            dataType: "json",
                                            data: JSON.stringify(posObj),
                                            contentType: "application/json; charset=utf-8",
                                            success: function (res) {
                                                console.log(res);
                                                console.log('Everything worked.');
                                            }.bind(that),
                                            error: function (e) {
                                                console.log(e);
                                                console.log(e, "Error adding data! Please try again.");
                                            }
                                        });
                                    }.bind(that)
                                });
                               
                            }.bind(that),
                            error: function (e) {
                                console.log(e);
                                console.log(e, "Error adding data! Please try again.");
                            }
                        });
                    }
                });
            }.bind(that),
            error: function (e) {
                console.log(e, "Error adding data! Please try again.");
            }
        });
    },
    editRow: function (post, that) {

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
}