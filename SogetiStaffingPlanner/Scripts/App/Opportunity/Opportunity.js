new Vue({
    el: '#opportunity',
    data: {
        opportunities: '',
        opportunityName: '',
        opportunityNotes: '',
        clientContact: '',
        clientId: null,
        addState: false,
        accountExecutiveUserId: null,
        unitId: null,
        regionId: null,
        soldStatusId: null,
        opportunityOwnerUserId: null,
        errors: [],
    },
    methods: {
        onSubmit: function () {
            let data = {};
            this.getForm(data);
            this.checkForm();
            if (!this.errors.length) {
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
            }
 
        },
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
            /* Looks for duplicate Opportunity Names */
            for (let i = 0; i < this.opportunities.length; i++) {
                if (this.opportunityName == this.opportunities[i]['opportunityName']) {
                    this.errors.push('Opportunity Name: "' + this.opportunityName + '" already exists.')
                    break;
                }
            }

            if (!this.errors.length) { return true; }
        },
        cancel: function () {
            this.errors = [];
            this.addState = false;
        },
        getForm: function (data) {
            console.log(this.opportunityName);
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
        },
        clearForm: function () {
            this.addState = false;
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
        },
        onEdit: function (name) {
            alert(name);
        }
    },
    created: function () {
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "GetOpportunities",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                this.opportunities = data;
            }.bind(this)
        });
    }
});