new Vue({
    el: '#opportunity',
    data: {
        opportunities: '',
        clients: '',
        units: '',
        opportunityName: '',
        opportunityNotes: '',
        clientContact: '',
        clientId: null,
        addState: false,
        updateState: false,
        accountExecutiveUserId: null,
        unitId: null,
        regionId: null,
        soldStatusId: null,
        opportunityOwnerUserId: null,
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
            this.opportunityNotes = opportunity.opportunityNotes;
            this.clientContact = opportunity.clientContact;
            this.clientId = opportunity.clientId;
            this.accountExecutiveUserId = opportunity.accountExecutiveUserId;
            this.unitId = opportunity.unitId;
            this.regionId = opportunity.regionId;
            this.soldStatusId = opportunity.soldStatusId;
            this.opportunityOwnerUserId = opportunity.opportunityOwnerUserId;
            this.active = true;
            /* Set form to drop down */
            this.addState = true;
            console.log(this.clientId);
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
            alert(this.opportunityName + ' updated!');
            this.clearForm();
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
                this.errors.push('Client ID required.');
            } if (!this.clientContact) {
                this.errors.push('Client Contact required.');
            } if (!this.opportunityNotes) {
                this.errors.push('Opportunity Notes required.');
            } if (!this.accountExecutiveUserId) {
                this.errors.push('Account Executive User ID required.');
            } if (!this.clientId) {
                this.errors.push('Client ID required.');
            } if (!this.regionId) {
                this.errors.push('Region ID required.');
            } if (!this.soldStatusId) {
                this.errors.push('Sold Status ID required.');
            } if (!this.opportunityOwnerUserId) {
                this.errors.push('Opportunity Owner User ID required.');
            }
            console.log('opportunityname: ' + typeof (this.opportunityName)); console.log('clientId: ' + typeof (this.clientId));
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
                                console.log(data);
                            }.bind(this)
                        });
                    }.bind(this)
                });
            }.bind(this)
        });
    }
});