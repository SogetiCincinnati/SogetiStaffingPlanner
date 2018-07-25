// requests for practice manager view

let requests = {
    getMainData: function (that) {
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "Home/GetMainData",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log('Posts', data);
                that.posts = data;
            }.bind(that), error: function (e) {
                console.log('error');
                console.log(e);
            }
        });
    },
    fetchClients: function (that) {
        console.log('fetching');
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
                that.findSelected();
                that.scrollDown();

            }.bind(that)
        });
    },
    fetchPositions: function (that) {
        $.ajax({ // get positions
            async: false,
            cache: false,
            type: "GET",
            url: "Position/GetPosition",
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
    getOpportunityList: function (that) {
        // GET OPPORTUNITY LIST
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "Opportunity/GetOpportunities",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                that.opportunities = data;
            }.bind(that)
        });
    },
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
              
            }.bind(that)
        });
    },
    editClient: function (that) {
        
        $.ajax({
            type: "POST",
            url: "Client/EditClient",
            dataType: "json",
            data: JSON.stringify(that.formData),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                //Receives message from backend for you to do what you want with it
                console.log('POST request success');
                that.addState = false;
                that.state.updateState = false;
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
                                        
                                        let posObj = {
                                            opportunityId: data[data.length - 1].opportunityId,
                                            unitPracticeId: 4,
                                            positionName: that.formData.positionName,
                                            numberOfPositions: that.formData.numberOfPositions,
                                            skillset: that.formData.skillset,
                                            hireCandidate: that.formData.hiredCandidate,
                                            proposedCandidate: that.formData.proposedCandidate,
                                            rejectedCandidate: that.formData.rejectedCandidate,
                                            acceptedCandidate: that.formData.acceptedCandidate,
                                            positionNote: that.formData.positionNote,
                                            lastModifiedUserId: 1,
                                            lastModified: new Date(),
                                            active: true,
                                            positionStatusId: that.formData.positionStatusId
                                        };
                                        console.log('POSITION OBJECT', posObj);
                                        $.ajax({
                                            type: "POST",
                                            url: "Position/AddPosition",
                                            dataType: "json",
                                            data: JSON.stringify(posObj),
                                            contentType: "application/json; charset=utf-8",
                                            success: function (res) {
                                                requests.getMainData(that);
                                                that.clearForm();
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
    editRow: function (that) {
        let clientData = {};
        
        
        let clientObj = {
            clientName: that.formData.clientName,
            clientSubbusiness: that.formData.clientSubbusiness,
            active: that.editObjs.clientEdit.Active, // FIX THIS!!!
            clientId: that.editObjs.clientEdit.ClientId // FIX THIS!!!
        }
        console.log(clientObj);
        $.ajax({
            type: "POST",
            url: "Client/EditClient",
            dataType: "json",
            data: JSON.stringify(clientObj),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                ///////// EDIT OPPORTUNITY ///////////////////
                let oppObj = {
                    id: that.editObjs.opportunityEdit.opportunityId,
                    clientId: that.editObjs.opportunityEdit.clientId,
                    accountExecutiveUserId: that.formData.accountExecutiveUserId,
                    unitId: that.formData.unitId,
                    regionId: that.formData.regionId,
                    opportunityName: that.formData.opportunityName,
                    opportunityNotes: that.formData.opportunityNotes,
                    clientContact: that.formData.clientContact,
                    active: true
                };
                $.ajax({
                    type: "POST",
                    url: "Opportunity/EditPost",
                    dataType: "json",
                    data: JSON.stringify(oppObj),
                    contentType: "application/json; charset=utf-8",
                    success: function (res) {
                     //////EDIT POSITION///////////////
                        posObj = {
                            positionId: that.editObjs.positionEdit.PositionId,
                            opportunityId: that.editObjs.positionEdit.OpportunityId,
                            unitPracticeId: that.editObjs.positionEdit.UnitPracticeId,
                            positionName: that.formData.positionName,
                            numberOfPositions: that.formData.numberOfPositions,
                            skillset: that.editObjs.positionEdit.Skillset,
                            rate: that.editObjs.positionEdit.Rate,
                            acceptedCandidate: that.formData.acceptedCandidate,
                            proposedCandidate: that.formData.proposedCandidate,
                            hireCandidate: that.formData.hiredCandidate,
                            rejectedCandidate: that.formData.rejectedCandidate,
                            positionNote: that.formData.positionNote,
                            active: that.editObjs.positionEdit.Active,
                            positionStatusId: that.formData.positionStatusId
                        };
                        $.ajax({
                            type: "POST",
                            url: "Position/EditPosition",
                            dataType: "json",
                            data: JSON.stringify(posObj),
                            contentType: "application/json; charset=utf-8",
                            success: function (res) {
                                //// SUCCESS CASE ////////
                                that.addState = false;
                                that.state.updateState = false;
                                requests.getMainData(that);
                                requests.getAEList(this);
                                requests.getRegionList(this);
                                requests.getUnitList(this);
                                requests.getPositionStatusList(this);
                                requests.getOpportunityList(this);
                                requests.fetchPositions(this);
                                requests.fetchClients(this);
                                that.clearForm();
                            }.bind(that),
                            error: function (e) {
                                console.log(e);
                                console.log(e, "Error adding data! Please try again.");
                            }
                        });
                    }.bind(that),
                    error: function (e) {
                        console.log(e);
                        console.log(e, "Error adding data! Please try again.");
                    }
                });
               
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
    }
}