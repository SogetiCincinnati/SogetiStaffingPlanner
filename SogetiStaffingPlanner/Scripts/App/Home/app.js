

new Vue({
    el: '#app',
    data: {
        addState: false,
        displayState: false,
        displayView: '',
        posts: [],
        users: [],
        clients: [],
        aes: [],
        regions: [],
        units: [],
        positionStatuses: [],
        opportunities: [],
        positions: [],
        submitObjs: {
            opportunityObj: null
        },
        editObjs: {
            clientEdit: null,
            opportunityEdit: null,
            positionEdit: null
        },
        formData: {
            accountExecutiveUserId: null,
            regionId: null,
            opportunityName: null,
            opportunityNotes: null,
            unitId: null,
            rate: null,
            numberOfPositions: null,
            positionName: null,
            soldStatus: null,
            positionStatusId: null,
            clientName: null,
            clientSubbusiness: null,
            clientId: null,
            AE: null,
            ACT: null,
            clientContact: null,
            minConsultantGrade: null,
            maxConsultantGrade: null,
            rate: null,
            acceptedCandidate: null,
            hiredCandidate: null,
            rejectedCandidate: null,
            proposedCandidate: null,
            duration: null,
            skillset: null,
            expectedStartDate: null,
            positionNote: null,
            opportunityId: null
        },
        filters: {
            displayFilters: false,
            positionStatusFilter: [1, 2, 3],
            priorityFilter: ['High', 'Medium', 'Low'],
            unitFilter: [1, 2, 3],
            posStatusApp: false,
            priorityApp: false,
            priorities: ['High', 'Medium', 'Low'],
            status: ''
        },
        state: {
            lastClientId: null,
            lastOppId: null,
            updateState: false,
            clientQuickAdd: false,
            opportunityQuickAdd: false
        },
        errors: {

        },
        errorCount: null,
        quickClientErr: 0,
        quickOppErr: 0,
        message: null
    },
    //Code sends data to validation code.
    watch: {
        'formData.positionName': function (newVal, oldVal) {
            validate.checkPositionName(newVal, oldVal, this);
        },
        'formData.numberOfPositions': function (newVal, oldVal) {
            validate.checkNumberOfPositions(newVal, oldVal, this);
        },
        'formData.proposedCandidate': function (newVal, oldVal) {
            validate.checkProposedCandidate(newVal, oldVal, this);
        },
        'formData.acceptedCandidate': function (newVal, oldVal) {
            validate.checkAcceptedCandidate(newVal, oldVal, this);
        },
        'formData.rejectedCandidate': function (newVal, oldVal) {
            validate.checkRejectedCandidate(newVal, oldVal, this);
        },
        'formData.hiredCandidate': function (newVal, oldVal) {
            validate.checkHiredCandidate(newVal, oldVal, this);
        },
        'formData.positionStatusId': function (newVal, oldVal) {
            validate.checkPositionStatusId(newVal, oldVal, this);
        },
        'formData.positionNote': function (newVal, oldVal) {
            validate.checkPositionNote(newVal, oldVal, this);
        },
        'formData.rate': function (newVal, oldVal) {
            validate.checkRate(newVal, oldVal, this);
        },
        'formData.clientId': function (newVal, oldVal) {
            validate.checkClientId(newVal, oldVal, this);
        },
        'formData.opportunityId': function (newVal, oldVal) {
            validate.checkOpportunityId(newVal, oldVal, this);
        },
        'formData.clientName': function (newVal, oldVal) {
            validate.checkClientName(newVal, oldVal, this);
        },
        'formData.clientSubbusiness': function (newVal, oldVal) {
            validate.checkClientSubbusiness(newVal, oldVal, this);
        },
        'formData.opportunityName': function (newVal, oldVal) {
            validate.checkOpportunityName(newVal, oldVal, this);
        },
        'formData.accountExecutiveUserId': function (newVal, oldVal) {
            validate.checkAccountExecutiveUserId(newVal, oldVal, this);
        },
        'formData.unitId': function (newVal, oldVal) {
            validate.checkUnitId(newVal, oldVal, this);
        },
        'formData.regionId': function (newVal, oldVal) {
            validate.checkRegionId(newVal, oldVal, this);
        },
        'formData.clientContact': function (newVal, oldVal) {
            validate.checkClientContact(newVal, oldVal, this);
        },
        /*'formData.opportunityNotes': function (newVal, oldVal) {
            validate.checkOpportunityNotes(newVal, oldVal, this);
        },*/


    },
    methods: {
        checkPositionName(val) {
            validate.checkPositionName(this);
        },
        add: function () {
            this.addState = true;
            this.errors = {};
            window.scrollTo(0, 200);
        },
        clearForm: function () {
            this.formData = {
                accountExecutiveUserId: null,
                regionId: null,
                opportunityName: null,
                opportunityNotes: null,
                unitId: null,
                numberOfPositions: null,
                positionName: null,
                soldStatus: null,
                positionStatusId: null,
                clientName: null,
                clientSubbusiness: null,
                AE: null,
                ACT: null,
                clientContact: null,
                minConsultantGrade: null,
                maxConsultantGrade: null,
                rate: null,
                acceptedCandidate: null,
                hiredCandidate: null,
                rejectedCandidate: null,
                proposedCandidate: null,
                duration: null,
                skillset: null,
                expectedStartDate: null,
                positionNote: null
            }
        },
        cancel: function () {
            this.errors = {};
            this.addState = false;
            this.state.updateState = false;
            this.state.clientQuickAdd = false;
            this.state.opportunityQuickAdd = false;
            this.message = null;
            //CLEAR FORM
            this.clearForm();
            window.scrollTo(0, 0);
        },
        onSubmit: function () {
            validate.checkSubmission(this);
            if (this.state.updateState == true) {
                requests.editRow(this);
                return;
            }
            let clientObj = {
                clientName: this.formData.clientName,
                clientSubbusiness: this.formData.clientSubbusiness,
                unitId: this.formData.unitId,
                regionId: this.formData.regionId,
                opportunityName: this.formData.opportunityName,
                opportunityNotes: this.formData.opportunityNotes,
                clientContact: this.formData.clientContact,
                active: true
             };
            requests.addRow(clientObj, this);
            requests.getAEList(this);
            requests.getRegionList(this);
            requests.getUnitList(this);
            requests.getPositionStatusList(this);
            requests.getOpportunityList(this);
            requests.fetchPositions(this);
            requests.fetchClients(this);
        },
        onEdit: function (post) {
    
            this.errors.clientDropdown = null;
            this.errors.opportunityDropdown = null;
            window.scrollTo(0, 200);
            console.log('EDIT', post);
            console.log('EDIT OBJS', this.editObjs);
            // Populate edit tables.
            this.addState = true;
            this.state.updateState = true;
            this.displayState = false;

            //Populate client section of edit form
            this.formData.clientName = post.ClientName;
            this.formData.clientSubbusiness = post.ClientSubbusiness;
            this.formData.clientId = post.ClientId;
            for (let i = 0; i < this.clients.length; i++) {
                if (post.ClientId == this.clients[i].ClientId) {
                    this.editObjs.clientEdit = this.clients[i];
                }
            }
            for (let i = 0; i < this.positions.length; i++) {
                if (post.PositionId == this.positions[i].PositionId) {
                    this.editObjs.positionEdit = this.positions[i];
                }
                
            }
            //Populate opportunity section of edit form
            this.formData.opportunityName = post.OpportunityName;
            this.formData.opportunityId = post.OpportunityId;
            this.formData.accountExecutiveUserId = post.AE;
            this.formData.clientContact = post.ClientContact;
            for (let i = 0; i < this.opportunities.length; i++) {
                if (post.OpportunityId == this.opportunities[i].opportunityId) {
                    this.formData.opportunityNotes = this.opportunities[i].opportunityNotes;
                    this.formData.regionId = this.opportunities[i].regionId;
                    this.formData.unitId = this.opportunities[i].unitId;
                    this.editObjs.opportunityEdit = this.opportunities[i];
                }
            }
            //Populate position section of edit form
            this.formData.positionName = post.PositionName;
            this.formData.hiredCandidate = post.HireCandidate;
            this.formData.acceptedCandidate = post.AcceptedCandidate;
            this.formData.rejectedCandidate = post.RejectedCandidate;
            this.formData.proposedCandidate = post.ProposedCandidate;
            for (let i = 0; i < this.positions.length; i++) {
                if (this.positions[i].PositionId == post.PositionId) {
                    this.formData.numberOfPositions = this.positions[i].NumberOfPositions;
                    this.formData.positionStatusId = this.positions[i].PositionStatusId;
                    this.formData.positionNote = this.positions[i].PositionNote;
                    this.formData.rate = this.positions[i].Rate;
                    this.editObjs.positionEdit = this.positions[i];
                    }
            }
        },
        displayDetails: function (data) {
            this.displayState = true;
            this.state.updateState = false;
            this.displayView = data;
            window.scrollTo(0, 0);
        },
        displayDate: function (date) {
            try {
                let returnDate = date;
                returnDate = parseInt(returnDate.slice(6));
                returnDate = new Date(returnDate);
                returnDate = returnDate.toISOString().slice(0, 10);
                return returnDate;
            }
            catch (e) {

            }       
        },
        displayUser: function (id) {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].UserId == id) {
                    return this.users[i].UserFullName;
                }
            }
        },
        displayStatusName: function (id) {
            switch (id) {
                case 1:
                    return "Initiate";
                    break;
                case 2:
                    return "In-Progress";
                    break;
                case 3:
                    return "Need Candidates";
                    break;
                case 4:
                    return "Closed";
                    break;
            }
        },
        displayGrade: function (id) {
            switch (id) {
                case 1:
                    return "A1";
                    break;
                case 2:
                    return "A2";
                    break;
                case 3:
                    return "A";
                    break;
                case 4:
                    return "B";
                    break;
                case 5:
                    return "C";
                    break;
                case 6:
                    return "Non-EC";
                    break;
                case 7:
                    return "Any";
                    break;
            }
        },
        onClientQuickAdd: function () {
            this.state.clientQuickAdd = true;
            this.formData.clientName = null;
            this.formData.clientSubbusiness = null;
        },
        onClientCancel: function () {
            this.state.clientQuickAdd = false;
            this.quickClientErr = 0;
            this.errors.clientName = null;
            this.errors.clientSubbusiness = null;
            this.formData.clientId = null;
        },
        onClientSubmit: function () {
            if (!validate.checkClientSubmit(this)) {
                return;
            }
            let quickClient = {
                clientName: this.formData.clientName,
                clientSubbusiness: this.formData.clientSubbusiness
            };
            requests.quickAddClient(quickClient, this, this.formData.clientId);        
        },
        onOpportunityQuickAdd: function () {
            this.state.opportunityQuickAdd = true;
        },
        onOpportunitySubmit: function () {
            if (validate.checkOpportunitySubmit(this)) {
                console.log('fail');
                return;
            }
            let quickOpportunity = {
                clientId: this.formData.clientId,
                accountExecutiveUserId: this.formData.accountExecutiveUserId,
                unitId: this.formData.unitId,
                opportunityName: this.formData.opportunityName,
                clientContact: this.formData.clientContact,
                opportunityNote: this.formData.opportunityNote,
                regionId: this.formData.regionId
            }
            requests.quickAddOpportunity(quickOpportunity, this);
        },
        onOpportunityCancel: function () {
            this.state.opportunityQuickAdd = false;
            this.errors.opportunityName = null
            this.errors.accountExectuvieUserId = null;
            this.errors.unitId = null;
            this.errors.regionId = null;
            this.errors.opportunityNote = null;
            this.errors.clientContact = null;
        },
        displayFilters: function () {
            this.filters.displayFilters = !this.filters.displayFilters;
        },
        applyPosFilter: function () {
            requests.getMainData(this);
            this.getFilterStatus();
        },
        applyPriorityFilter: function () {
            requests.getMainData(this);
            this.getFilterStatus();
        },
        getFilterStatus: function () {
            this.filters.status = "";
            if (this.filters.positionStatusFilter.length < 4) {
                this.filters.status += " #Status "
            }
            if (this.filters.priorityFilter.length < 3) {
                this.filters.status += " #Priority ";
            }
            if (this.filters.unitFilter.length < 3) {
                this.filters.status += " #Unit ";
            }
        }
    },
    created: function () {
        requests.getMainData(this);
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "Client/GetUserList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                this.users = data;
            }.bind(this), error: function (e) {
                console.log('error');
                console.log(e);
            }
        });
        this.state.lastClientId = requests.fetchClients(this);
        requests.getAEList(this);
        requests.getRegionList(this);
        requests.getUnitList(this);
        requests.getPositionStatusList(this);
        requests.getOpportunityList(this);
        requests.fetchPositions(this);
        requests.fetchClients(this);
        this.getFilterStatus();
    },
    updated: function () {
        console.log(this.quickClientErr);
        validate.checkErrors(this);
        validate.checkClientErrs(this);
        validate.checkOppErrs(this);
    }
});
Vue.config.devtools = true;