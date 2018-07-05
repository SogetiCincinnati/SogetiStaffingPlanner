new Vue({
    el: '#opportunity',
    data: {
        opportunities: '',
        clients: '',
        units: '',
        regions: '',
        aes: '',
        ACTLeads: '',
        users: '',
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
        active: false,
        errors: {}
    },
    watch: {
        opportunityName: function (val) { validate.checkOpportunityName(val, this) },
        clientContact: function (val) { validate.checkClientContact(val, this) },
        opportunityNotes: function (val) { validate.checkOpportunityNotes(val, this) },
        clientId: function (val) { validate.checkClientId(val, this) },
        accountExecutiveUserId: function (val) { validate.checkAccountExecutiveUserId(val, this) },
        unitId: function (val) { validate.checkUserId(val, this) },
        regionId: function (val) { validate.checkRegionId(val, this) },
        soldStatusId: function (val) { validate.checkSoldStatusId(val, this) },
        opportunityOwnerUserId: function (val) { validate.checkOpportunityOwnerUserId(val, this) },
    },
    methods: {
        /* Clear out forms */
        clearForm: function () {
            this.opportunityId = null;
            this.addState = false;
            this.updateState = false;
            this.opportunityName = null;
            this.opportunityNotes = null;
            this.clientContact = null;
            this.clientID = null;
            this.accountExecutiveUserId = null;
            this.unitId = null;
            this.regionId = null;
            this.soldStatusId = null;
            this.opportunityOwnerUserId = null;
            this.clientId = null;
            this.active = false;
            this.errors = [];
        },
        onSubmit: function () {
            /* Check to see if updating preexisting Opportunity, or if adding a new one */
            validate.checkForm(this);
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
            this.opportunityId = opportunity.opportunityId;
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
            this.active = opportunity.active;
            /* Set form to drop down */
            this.addState = true;
            window.scrollTo(0, 100);
        },
        addOpportunity: function () {
            let data = this.buildJSON();
            requests.addOpportunity(data, this);
        },
        updateOpportunity: function () {
            let data = this.buildJSON();
            alert(this.opportunityName + ' updated!');
            this.clearForm();
            requests.editOpportunity(data, this);
        },
        /* This function will return an object based on the current data state on the Vue instance, which can then be seralized to JSON data */
        buildJSON: function () {
            let data = {};
            data.id = this.opportunityId;
            data.opportunityName = this.opportunityName;
            data.opportunityNotes = this.opportunityNotes;
            data.clientContact = this.clientContact;
            data.clientId = this.clientId;
            data.accountExecutiveUserId = this.accountExecutiveUserId;
            data.unitId = this.unitId;
            data.regionId = this.regionId;
            data.soldStatusId = this.soldStatusId;
            data.opportunityOwnerUserId = this.opportunityOwnerUserId;
            data.active = this.active;
            return data;
        },
        cancel: function () {
            this.errors = {};
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
        getLastModifiedUserName: function (id) {      
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].UserId === this.opportunityDetail.lastModifiedUserId) {
                    return this.users[i].UserFullName;
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
            window.scrollTo(0, 100);
        }
    },
    created: function () {
        requests.getOpportunityList(this);
        requests.getRegionList(this);
        requests.getUserList(this);
        requests.getAEList(this);
        requests.getSoldStatusList(this);
        requests.getACTLeadList(this);
        requests.getUnitList(this);
        requests.getClientList(this);
    }
});