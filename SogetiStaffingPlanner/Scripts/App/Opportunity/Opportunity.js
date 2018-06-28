new Vue({
    el: '#opportunity',
    data: {
        opportunities: '',
        clients: '',
        units: '',
        regions: '',
        aes: '',
        ACTLeads: '',
        soldStatuses: '',
        opportunityName: '',
        opportunityId: null,
        opportunityNotes: '',
        clientContact: '',
        clientId: null,
        addState: false,
        updateState: false,
        moreState: false,
        accountExecutiveUserId: null,
        unitId: null,
        regionId: null,
        soldStatusId: null,
        opportunityOwnerUserId: null,
        lastModifiedUserId: null,
        errors: []
    },
    methods: {
        /* Clear out forms */
        clearForm: function () {
            this.addState = false;
            this.updateState = false;
            this.opportunityName = '';
            this.opportunityNotes = '';
            this.clientContact = '';
            this.clientID = null;
            this.accountExecutiveUserId = null;
            this.unitId = null;
            this.regionId = null;
            this.soldStatusId = null;
            this.opportunityOwnerUserId = null;
            this.clientId = null;
            this.errors = [];
        },
        onSubmit: function () {
            /* Check to see if updating preexisting Opportunity, or if adding a new one */
            this.checkForm();
            if (!this.errors.length) {
                if (this.updateState) {
                    this.updateOpportunity();
                }
                else if (this.addState) {
                    this.addOpportunity();
                }
            } 
        },
        onEdit: function (opportunity) {
            /* Specify that status is being updated */
            this.updateState = true;
            /* Populate form with selected values */
            this.opportunityName = opportunity.opportunityName;
            this.opporunityName = opportunity.opportunityName;
            this.opportunityNotes = opportunity.opportunityNotes;
            this.clientContact = opportunity.clientContact;
            this.clientId = opportunity.clientId;
            this.accountExecutiveUserId = opportunity.accountExecutiveUserId;
            this.unitId = opportunity.unitId;
            this.regionId = opportunity.regionId;
            this.soldStatusId = opportunity.soldStatusId;
            this.opportunityOwnerUserId = opportunity.opportunityOwnerUserId;
            this.lastModifiedUserId = opportunity.lastModifiedUserId;
            this.active = true;
            /* Set form to drop down */
            this.addState = true;
        },
        addOpportunity: function () {
            let data = this.buildJSON();
            $.ajax({
                type: "POST",
                url: "AddOpportunity",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    alert("Added " + this.opportunityName + "!");
                    this.opportunities.push(data);
                    this.clearForm();
                }.bind(this),
                error: function (e) {
                    console.log(e);
                    console.log(e, "Error adding data! Please try again.");
                }
            });
        },
        updateOpportunity: function () {
            let data = this.buildJSON();
            data.id = 1;
            console.log(data);
            //alert(this.opportunityName + ' updated!');
            this.clearForm();
            $.ajax({
                type: "POST",
                url: "EditPost",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    // alert("Added " + this.opportunityName + "!");
                    this.opportunities.push(data);
                    this.clearForm();
                    /* This code will update the table.  It needs to be in it's own function */
                    $.ajax({
                        async: false,
                        cache: false,
                        type: "GET",
                        url: "GetOpportunities",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            this.opportunities = data;
                            console.log(this.opportunities);
                            // GET CLIENT LIST
                            $.ajax({
                                async: false,
                                cache: false,
                                type: "GET",
                                url: "GetClientList",
                                contentType: "application/json;charset=utf-8",
                                dataType: "json",
                                success: function (data) {
                                    this.clients = data;
                                    // GET UNIT LIST
                                    $.ajax({
                                        async: false,
                                        cache: false,
                                        type: "GET",
                                        url: "GetUnitList",
                                        contentType: "application/json;charset=utf-8",
                                        dataType: "json",
                                        success: function (data) {
                                            this.units = data;
                                        }.bind(this)
                                    });
                                }.bind(this)
                            });
                        }.bind(this)
                    });
                }.bind(this),
                error: function (e) {
                    console.log(e);
                    console.log(e, "Error adding data! Please try again.");
                }
            });
        },
        
        /* This function will return an object based on the current data state on the Vue instance, which can then be seralized to JSON data */
        buildJSON: function () {
            let data = {};
            data.opportunityName = this.opportunityName;
            data.opportunityNotes = this.opportunityNotes;
            data.clientContact = this.clientContact;
            data.clientId = this.clientId;
            data.accountExecutiveUserId = this.accountExecutiveUserId;
            data.unitId = this.unitId;
            data.regionId = this.regionId;
            data.soldStatusId = this.soldStatusId;
            data.opportunityOwnerUserId = this.opportunityOwnerUserId;
            data.active = true;
            return data;
        },
        /* Form validation method */
        checkForm: function () {
            this.errors = [];

            /*Checks to see if forms are empty */
            if (!this.opportunityName) {
                this.errors.push('Opportunity Name required.');
            } if (!this.clientId) {
                this.errors.push('Client required.');
            } if (!this.clientContact) {
                this.errors.push('Client Contact required.');
            } if (!this.accountExecutiveUserId) {
                this.errors.push('Account Executive required.');
            } if (!this.clientId) {
                this.errors.push('Client required.');
            } if (!this.regionId) {
                this.errors.push('Region required.');
            } if (!this.soldStatusId) {
                this.errors.push('Sold Status required.');
            } if (!this.opportunityOwnerUserId) {
                this.errors.push('Opportunity Owner required.');
            } if (!this.opportunityNotes) {
                this.errors.push('Opportunity Note required.');
            }
            /* Looks for duplicate Opportunity Names - if adding NEW, but not if UPDATING */
            if (!this.updateState) {
                for (let i = 0; i < this.opportunities.length; i++) {
                    if (this.opportunityName == this.opportunities[i]['opportunityName']) {
                        this.errors.push('Opportunity Name: "' + this.opportunityName + '" already exists.')
                        break;
                    }
                }
            }
            if (!this.errors.length) { return true; }
        },
        cancel: function () {
            this.errors = [];
            this.addState = false;
        },
        getClientName: function (clientId) { // pass id and get name back
            for (client in this.clients) {
                if (this.clients[client].ClientId == clientId) {
                    return(this.clients[clientId].ClientName);
                }
            }
        },
        getAEName: function (AEId) { // pass ID and get name back
            for (ae in this.aes) {
                if (this.aes[ae].UserId == AEId) {
                    return (this.aes[ae].FullName);
                }
            }
        },
        getUnitName: function (unitId) {
            for (unit in this.units) {
                if (this.units[unit].UnitId == unitId) {
                    return (this.units[unit].UnitName);
                }
            }
        },
        getRegionName: function (regionId) {
            for (region in this.regions) {
                if (this.regions[region].RegionId == regionId) {
                    return (this.regions[region].RegionName);
                }
            }
        },
        getSoldStatus: function (soldStatusId) {
            for (soldStatus in this.soldStatuses) {
                if (this.soldStatuses[soldStatus].SoldStatusId == soldStatusId) {
                    return (this.soldStatuses[soldStatus].SoldStatusName);
                }
            }
        },
        getOpportunityName: function (opportunityOwnerUserId) {
            
            for (ACTLead in this.ACTLeads) {
                if (this.ACTLeads[ACTLead].UserId == opportunityOwnerUserId) {
                    return (this.ACTLeads[ACTLead].FullName);
                }
            }
        },
        displayDetail: function (opportunity) {
            this.opportunityDetail = opportunity;
            /* Produces a human readable string for the details view panel */
            this.opportunityDetail.lastModified = this.opportunityDetail.lastModified.slice(6);
            this.opportunityDetail.lastModified = parseInt(this.opportunityDetail.lastModified);
            this.opportunityDetail.lastModified = new Date(this.opportunityDetail.lastModified);
            this.opportunityDetail.lastModified = this.opportunityDetail.lastModified.toDateString();
            /* Expands the pane */
            this.moreState = true;
        }
    },
    created: function () {
        // GET OPPORTUNITY LIST
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "GetOpportunities",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                this.opportunities = data;
                console.log(this.opportunities);
                // GET CLIENT LIST
                $.ajax({
                    async: false,
                    cache: false,
                    type: "GET",
                    url: "GetClientList",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        this.clients = data;
                        // GET UNIT LIST
                        $.ajax({
                            async: false,
                            cache: false,
                            type: "GET",
                            url: "GetUnitList",
                            contentType: "application/json;charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                this.units = data;
                            }.bind(this)
                        });
                    }.bind(this)
                });
            }.bind(this)
        });
        $.ajax({ // Region List
            async: false,
            cache: false,
            type: "GET",
            url: "GetRegionList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                this.regions = data;
            }.bind(this),
            error: function (e) {
                console.log(e);
            }
        });
        $.ajax({ // AE list
            async: false,
            cache: false,
            type: "GET",
            url: "GetAEList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                this.aes = data;
            }.bind(this),
            error: function (e) {
                console.log(e);
            }
        });
        $.ajax({ // sold status list
            async: false,
            cache: false,
            type: "GET",
            url: "GetSoldStatusList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                this.soldStatuses = data;
            }.bind(this),
            error: function (e) {
                console.log(e);
            }
        });
        $.ajax({ // ACT LEAD aka opportunity owner
            async: false,
            cache: false,
            type: "GET",
            url: "GetACTLeadList",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                this.ACTLeads = data;
            }.bind(this),
            error: function (e) {
                console.log(e);
            }
        });
    }
});