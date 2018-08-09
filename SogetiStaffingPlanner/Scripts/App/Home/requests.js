// requests for practice manager view

let requests = {
    getMainData: function (that, sorter) {
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "Home/GetMainData",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                let result = [];
                let filterPosResult = [];
                for (post in data) {
                    for (let i = 0; i < that.filters.positionStatusFilter.length; i++) {
                        if (that.filters.positionStatusFilter[i] == data[post].PositionStatusId) {
                            filterPosResult.push(data[post]);
                        }
                    }
                }
                let filterPriorityResult = [];
                for (post in filterPosResult) {
                    for (let i = 0; i < that.filters.priorityFilter.length; i++) {                      
                        if (that.filters.priorityFilter[i] == filterPosResult[post].Priority) {
                            filterPriorityResult.push(filterPosResult[post]);
                            
                        }
                    }
                }
                let unitFilterResult = [];
                for (post in filterPriorityResult) {
                    for (let i = 0; i < that.filters.unitFilter.length; i++) {
                        if (that.filters.unitFilter[i] == filterPriorityResult[post].UnitId) {
                            unitFilterResult.push(filterPriorityResult[post]);
                        }
                    }
                }
                
                that.posts = unitFilterResult;
                //Sort filtered results if parameter passed in
            
               
               
            }.bind(that), error: function (e) {
                console.log('error');
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
                that.findSelected();
                that.scrollDown();

            }.bind(that)
        });
    },
    quickAddClient: function (quickClient, that, id) {
        $.ajax({
            type: "POST",
            url: "Client/AddClient",
            dataType: "json",
            data: JSON.stringify(quickClient),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                //Receives message from backend for you to do what you want with it
                requests.fetchClients(that);
                requests.addMessage(that.formData.clientName, that);
                that.state.clientQuickAdd = false;
                that.formData.clientName = quickClient.clientName;
                that.formData.clientSubbusiness = quickClient.clientSubbusiness;
                function findRecentClient(data) {
                    let max = 0;
                    jQuery.map(data, function (obj) {
                        if (obj.ClientId > max)
                            max = obj.ClientId;
                    });
                    return max;
                }
                that.state.lastClientId = findRecentClient(that.clients);
                that.formData.clientId = that.state.lastClientId;
                
            }.bind(that),
            error: function (e) {
                console.log(e, "Error adding data! Please try again.");
            }
        });
    },
    quickAddOpportunity: function (quickOpportunity, that, id) {
        $.ajax({
            type: "POST",
            url: "Opportunity/AddOpportunity",
            dataType: "json",
            data: JSON.stringify(quickOpportunity),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                requests.getOpportunityList(that);
                that.state.opportunityQuickAdd = false;
                requests.getOpportunityList(that);
               
                that.formData.opportunityId = that.opportunities[that.opportunities.length - 1].opportunityId;
            }.bind(that),
            error: function (e) {
                console.log(e);
                console.log(e, "Error adding data! Please try again.");
            }
        });
    },
    quickEditOpportunity: function (that) {
        console.log(that.editObjs, 'HELLLO');
        let editObj = {
            id: that.formData.opportunityId,
            clientId: that.editObjs.oppQuickEdit.clientId,
            accountExecutiveUserId: that.editObjs.oppQuickEdit.accountExecutiveUserId,
            unitId: that.editObjs.oppQuickEdit.unitId,
            regionId: that.editObjs.oppQuickEdit.regionId,
            soldStatusId: that.editObjs.oppQuickEdit.soldStatusId,
            opportunityName: that.editData.opportunityName,
            opportunityOwnerUserId: that.editObjs.oppQuickEdit.opportunityOwnerUserId,
            opportunityNotes: that.editObjs.oppQuickEdit.opportunityNotes,
            clientContact: that.editData.clientContact,
            active: that.editObjs.oppQuickEdit.active
        }
        console.log(editObj);
        $.ajax({
            type: "POST",
            url: "Opportunity/EditPost",
            dataType: "json",
            data: JSON.stringify(editObj),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                that.state.opportunityQuickAdd = false;
                that.state.opportunityQuickEdit = false;
                requests.getOpportunityList(that);

            }.bind(that),
            error: function (e) {
                console.log(e);
                console.log(e, "Error adding data! Please try again.");
            }
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
                console.log('OPPS', that.opportunities);
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
    /*addRow: function (client, that) {
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
                        $.ajax({
                            async: false,
                            cache: false,
                            type: "GET",
                            url: "Opportunity/GetOpportunities",
                            contentType: "application/json;charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                that.opportunities = data;
                                let oppObj = {
                                    clientId: that.formData.clientId,
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
                            }.bind(that)
                        });
                        /////////////////////////////////
                        
                    }
                });
    },*/
    addRow: function (client, that) {
        let foundOpp = null;
        for (let i = 0; i < that.opportunities.length; i++) {
            if (that.formData.opportunityId == that.opportunities[i].opportunityId) {
                foundOpp = that.opportunities[i];
            }
        }
        let oppObj = {
            id: foundOpp.opportunityId,
            clientId: that.formData.clientId,
            accountExecutiveUserId: foundOpp.accountExecutiveUserId,
            unitId: foundOpp.unitId,
            regionId: foundOpp.regionId,
            opportunityName: foundOpp.opportunityName,
            opportunityNotes: foundOpp.opportunityNotes,
            clientContact: foundOpp.clientContact,
            active: foundOpp.active
        }
        console.log(oppObj);
        $.ajax({
            type: "POST",
            url: "Opportunity/EditPost",
            dataType: "json",
            data: JSON.stringify(oppObj),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                console.log('SUCCESS!!!');
                console.log(res);
                let posObj = {
                    opportunityId: foundOpp.opportunityId,
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
                    positionStatusId: that.formData.positionStatusId,
                    rate: that.formData.rate
                }
                $.ajax({
                    type: "POST",
                    url: "Position/AddPosition",
                    dataType: "json",
                    data: JSON.stringify(posObj),
                    contentType: "application/json; charset=utf-8",
                    success: function (res) {
                        requests.getMainData(that);
                        requests.fetchPositions(that);
                        requests.fetchClients(that);
                        that.clearForm();
                        that.addState = false;
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
    },
    editRow: function (that) {     
        //Code to edit the client, should change client associated with opportunity.
        //Code to edit the opportunity, then update if needed.
        let foundOpp = null;
        for (let i = 0; i < that.opportunities.length; i++) {
            if (that.formData.opportunityId == that.opportunities[i].opportunityId) {
                foundOpp = that.opportunities[i];
            }
        }
        console.log(foundOpp, 'FOUND OPP EDIT');
        console.log('EDIT CLIENT ID', that.formData.clientId);
        let oppObj = {
            id: foundOpp.opportunityId,
            clientId: that.formData.clientId,
            accountExecutiveUserId: foundOpp.accountExecutiveUserId,
            unitId: foundOpp.unitId,
            regionId: foundOpp.regionId,
            opportunityName: foundOpp.opportunityName,
            opportunityNotes: foundOpp.opportunityNotes,
            clientContact: foundOpp.clientContact,
            active: foundOpp.active,
            soldStatusId: foundOpp.soldStatusId, 
            opportunityOwnerUserId: foundOpp.opportunityOwnerUserId
        }
        $.ajax({
            type: "POST",
            url: "Opportunity/EditPost",
            dataType: "json",
            data: JSON.stringify(oppObj),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                let positionObj = {
                    positionId: that.editObjs.positionEdit.PositionId,
                    opportunityId: foundOpp.opportunityId,
                    unitPracticeId: that.editObjs.positionEdit.UnitPracticeId,
                    positionName: that.formData.positionName,
                    numberOfPositions: that.formData.numberOfPositions,
                    skillset: that.editObjs.positionEdit.Skillset,
                    rate: that.formData.rate,
                    hireCandidate: that.formData.hiredCandidate,
                    proposedCandidate: that.formData.proposedCandidate,
                    acceptedCandidate: that.formData.acceptedCandidate,
                    rejectedCandidate: that.formData.rejectedCandidate,
                    positionNote: that.formData.positionNote,
                    active: that.editObjs.positionEdit.Active,
                    positionStatusId: that.formData.positionStatusId
                };
                $.ajax({
                    type: "POST",
                    url: "Position/EditPosition",
                    dataType: "json",
                    data: JSON.stringify(positionObj),
                    contentType: "application/json; charset=utf-8",
                    success: function (res) {
                        requests.fetchPositions(that);
                        requests.getMainData(that);
                        requests.fetchClients(that);
                    }.bind(that),
                    error: function (e) {
                        console.log(e);
                        console.log(e, "Error adding data! Please try again.");
                    }
                });
                that.state.updateState = false;
                that.addState = false;
                that.clearForm();
              
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
}