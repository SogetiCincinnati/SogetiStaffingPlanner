new Vue({
    el: '#opportunity',
    data: {
        opportunities: '',
        message: '',
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
        errors: {
            opportunityName: null,
            clientId: null,
            accountExecutiveUserId: null,
            unitId: null,
            regionId: null
        },
        selected: null, // finds the active entry that has been added or edited
    },
    computed: {
        isDisabled() {
            let count = 0;
            if (this.errors.opportunityName) { count += 1 };
            if (this.errors.clientId) { count += 1 };
            if (this.errors.accountExecutiveUserId) { count += 1 };
            if (this.errors.unitId) { count += 1 };
            if (this.errors.regionId) { count += 1 };
            if (count > 0) {
                return true;
            } else {
                return false;
            }
        }
    },
    watch: {
        opportunityName: function (val) { validate.checkOpportunityName(val, this) },
      //  clientContact: function (val) { validate.checkClientContact(val, this) },
      //  opportunityNotes: function (val) { validate.checkOpportunityNotes(val, this) },
        clientId: function (val) { validate.checkClientId(val, this) },
        accountExecutiveUserId: function (val) { validate.checkAccountExecutiveUserId(val, this) },
        unitId: function (val) { validate.checkUnitId(val, this) },
        regionId: function (val) { validate.checkRegionId(val, this) },
       // soldStatusId: function (val) { validate.checkSoldStatusId(val, this) },
       // opportunityOwnerUserId: function (val) { validate.checkOpportunityOwnerUserId(val, this) },
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

            this.errors.opportunityName = null;
            this.errors.clientId = null;
            this.errors.accountExecutiveUserId = null;
            this.errors.unitId = null;
            this.errors.regionId = null;
            window.scrollTo(0, 0);
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
            let data = helpers.buildJSON(this);
            requests.addOpportunity(data, this);
        },
        updateOpportunity: function () {
            let data = helpers.buildJSON(this);
            requests.editOpportunity(data, this);
        },
        add: function () {
            this.addState = true;
            window.scrollTo(0, 100);
        },
        /* This function will return an object based on the current data state on the Vue instance, which can then be seralized to JSON data */   
        cancel: function () {
            this.errors.opportunityName = null;
            this.errors.clientId = null;
            this.errors.accountExecutiveUserId = null;
            this.errors.unitId = null;
            this.errors.regionId = null;
            this.addState = false;
            window.scrollTo(0, 0);
        },
        getClientName: function (clientId) { // pass id and get name back
            
            for (i in this.clients) {
                if (clientId == this.clients[i].ClientId) {
                    return this.clients[i].ClientName;
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
            if (soldStatusId == 'N/A') {
                return 'N/A';
            }
            for (soldStatus in this.soldStatuses) {
                if (this.soldStatuses[soldStatus].SoldStatusId == soldStatusId) {
                    return (this.soldStatuses[soldStatus].SoldStatusName);
                }
            }
        },
        getOpportunityName: function (opportunityOwnerUserId) {
            if (opportunityOwnerUserId == 'N/A') {
                return 'N/A';
            }
            for (ACTLead in this.ACTLeads) {
                if (this.ACTLeads[ACTLead].UserId == opportunityOwnerUserId) {
                    return (this.ACTLeads[ACTLead].FullName);
                }
            }
        },
        displayDetail: function (opportunity) {
            /* Set up some N/A values */
            for (item in opportunity) {
                if (!opportunity[item]) {
                    opportunity[item] = 'N/A';
                }
            }
            this.opportunityDetail = opportunity;
            /* Produces a human readable string for the details view panel */
            this.opportunityDetail.lastModified = this.opportunityDetail.lastModified.slice(6);
            this.opportunityDetail.lastModified = parseInt(this.opportunityDetail.lastModified);
            this.opportunityDetail.lastModified = new Date(this.opportunityDetail.lastModified);
            this.opportunityDetail.lastModified = this.opportunityDetail.lastModified.toDateString();
            /* Expands the pane */
            this.moreState = true;
            window.scrollTo(0, 100);
        },
        back: function () {
            this.opportunityDetail = false;
            this.moreState = false;
            window.scrollTo(0, 0);
        },
        scrollDown: function () {    // Add a 1 second delay so the table can update before scrolling down
            console.log('opportunity length =\t' + this.opportunities.length);
            console.log('this.selected =\t' + this.selected);
            let container = document.querySelector(".scrollBar"); // looks for table scrollbar
            let scrollDistance = this.selected * (container.scrollHeight / this.opportunities.length); // calculate how far to scroll down
            console.log('table length = ' + container.scrollHeight);
            console.log('scroll Distance = ' + scrollDistance);
            setTimeout(function () { // wait for the table to update, then scroll to the entry
                container.scrollTo(0, scrollDistance);
            }, 100);
        },
        findSelected: function () {
            for (o in this.opportunities) { // Highlights the updated row
                console.log(this.opportunities[o].opportunityName);
                console.log(this.opportunityName);
                if (this.opportunities[o].opportunityName == this.opportunityName) {
                   // console.log(this.opportunities[o].OpportunityName);
                   // console.log(this.opportunityName);
                    console.log('found at ' + o);
                    this.selected = o;
                    break;
                }
            }
        },

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