

new Vue({
    el: '#app',
    data: {
        addState: false,
        displayState: false,
        displayView: '',
        posts: [],
        users: [],
        clients: [],
        grades: [],
        aes: [],
        regions: [],
        units: [],
        ACTLeads: [],
        positionStatuses: [],
        soldStatuses: [],
        opportunities: [],
        positions: [],
        submitObjs: {
            opportunityObj: null
        },
        editObjs: {
            clientEdit: null,
            opportunityEdit: null,
            positionEdit: null,
            oppQuickEdit: null
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
            soldStatusId: null,
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
            opportunityId: null,
            duration: null,
            expectedStartDate: null,
            skillset: null,
            unitPracticeId: null
        },
        editData: {
            accountExecutiveUserId: null,
            regionId: null,
            unitId: null,
            clientContact: null,
            opportunityNote: null,
            opportunityName: null,
            opportunityOwnerUserId: null
        },
        oppDetails: {
            accountExecutiveUserId: null,
            regionId: null,
            unitId: null,
            clientContact: null,
            opportunityNote: null,
            opportunityName: null
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
        sorting: {
            sorter: null,
            OpportunityName: 0,
            oppSort: true,
            oppDir: false,
            UnitName: 0,
            unitSort: true,
            unitDir: false,
            NumberOfPositions: 0,
            numPosSort: true,
            numPosDir: false,
            PositionName: 0,
            posNameSort: true,
            posNameDir: false,
            Priority: 0,
            prioritySort: true,
            priorityDir: false,
            SoldStatusName: 0,
            soldSort: true,
            soldDir: false,
            PositionStatusId: 0,
            statusSort: true,
            statusDir: false,
            ClientName: 0,
            clientNameSort: true,
            clientNameDir: false,
            AE: 0,
            AESort: true,
            AEDir: false,
            ACT: 0,
            ACTSort: true,
            ACTDir: false
        },
        state: {
            lastClientId: null,
            lastOppId: null,
            updateState: false,
            clientQuickAdd: false,
            clientQuickEdit: false,
            opportunityQuickAdd: false,
            opportunityQuickEdit: false,
            displayOppState: false
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
        ////// WATCHERS FOR VALIDATION ////////////
        'formData.positionName': function (newVal, oldVal) {
            validate.checkPositionName(newVal, oldVal, this);
        },
        'formData.numberOfPositions': function (newVal, oldVal) {
            validate.checkNumberOfPositions(newVal, oldVal, this);
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
        /// WATCHERS FOR SORTING ////////
        'sorting.OpportunityName': function (val) {
            if (val > 0) { this.sorting.oppSort = false };
            if (val % 2 === 0) { this.sorting.oppDir = true } else { this.sorting.oppDir = false };
        },
        'sorting.UnitName': function (val) {
            if (val > 0) { this.sorting.unitSort = false };
            if (val % 2 === 0) { this.sorting.unitDir = true } else { this.sorting.unitDir = false };
        },
        'sorting.NumberOfPositions': function (val) {
            if (val > 0) { this.sorting.numPosSort = false };
            if (val % 2 === 0) { this.sorting.numPosDir = true } else { this.sorting.numPosDir = false };
        },
        'sorting.PositionName': function (val) {
            if (val > 0) { this.sorting.posNameSort = false };
            if (val % 2 === 0) { this.sorting.posNameDir = true } else { this.sorting.posNameDir = false };
        },
        'sorting.Priority': function (val) {
            if (val > 0) { this.sorting.prioritySort = false };
            if (val % 2 === 0) { this.sorting.priorityDir = true } else { this.sorting.priorityDir = false };
        },
        'sorting.SoldStatusName': function (val) {
            if (val > 0) { this.sorting.soldSort = false };
            if (val % 2 === 0) { this.sorting.soldDir = true } else { this.sorting.soldDir = false };
        },
        'sorting.PositionStatusId': function (val) {
            if (val > 0) { this.sorting.statusSort = false };
            if (val % 2 === 0) { this.sorting.statusDir = true } else { this.sorting.statusDir = false };
        },
        'sorting.ClientName': function (val) {
            if (val > 0) { this.sorting.clientNameSort = false };
            if (val % 2 === 0) { this.sorting.clientNameDir = true } else { this.sorting.clientNameDir = false };
        },
        'sorting.AE': function (val) {
            if (val > 0) { this.sorting.AESort = false };
            if (val % 2 === 0) { this.sorting.AEDir = true } else { this.sorting.AEDir = false };
        },
        'sorting.ACT': function (val) {
            if (val > 0) { this.sorting.ACTSort = false };
            if (val % 2 === 0) { this.sorting.ACTDir = true } else { this.sorting.ACTDir = false };
        },



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
            
            this.formData.opportunityId = post.OpportunityId;
           
            
            //Populate position section of edit form
            this.formData.positionName = post.PositionName;
            this.formData.hiredCandidate = post.HireCandidate;
            this.formData.acceptedCandidate = post.AcceptedCandidate;
            this.formData.rejectedCandidate = post.RejectedCandidate;
            this.formData.proposedCandidate = post.ProposedCandidate;
            for (let i = 0; i < this.positions.length; i++) {
                
                if (this.positions[i].PositionId == post.PositionId) {
                    console.log(this.positions[i]);
                    this.formData.numberOfPositions = this.positions[i].NumberOfPositions;
                    this.formData.positionStatusId = this.positions[i].PositionStatusId;
                    this.formData.positionNote = this.positions[i].PositionNote;
                    this.formData.rate = this.positions[i].Rate;
                    this.formData.duration = this.positions[i].Duration;
                    this.formData.expectedStartDate = this.displayDate(this.positions[i].ExpectedStartDate);
                    this.formData.minConsultantGradeId = this.positions[i].MinConsultantGradeId;
                    this.formData.maxConsultantGradeId = this.positions[i].MaxConsultantGradeId;
                    this.formData.skillset = this.positions[i].Skillset;
                    this.formData.unitPracticeId = 4;
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
        displaySort: function (value) {
                
            this.sorting.sorter = value;
            
            switch (value) {
                case "OpportunityName":
                    return "Opportunity Name";
                case "UnitName":
                    return "Unit";
                case "PositionName":
                    return "Position Name";
                case "NumberOfPositions":
                    return "Number Of Positions";
                case "Priority":
                    return "Priority";
                case "SoldStatusName":
                    return "Sold Status";
                case "PositionStatusId":
                    return "Position Status";
                case "ClientName":
                    return "Client Name";
                case "AE":
                    return "AE";
                case "ACT":
                    return "Opportunity Owner";
                default:
                    return "Not selected"
            }
            return value;
        },
        onClientQuickAdd: function () {
            this.state.clientQuickAdd = true;
            
        },
        onClientQuickEdit: function () {
            console.log(this.formData.clientId);
            let client;
            for (let i = 0; i < this.clients.length; i++) {
                if (this.clients[i].ClientId == this.formData.clientId) {
                    client = this.clients[i];
                    console.log('MATCH');
                    console.log(client);
                    this.formData.clientName = client.ClientName;
                    this.formData.clientSubbusiness = client.ClientSubbusiness;
                };
            }
            this.state.clientQuickAdd = true;
            this.state.clientQuickEdit = true;
            this.formData.clientName = this.editObjs.clientEdit.ClientName;
            this.formData.clientSubbusiness = this.editObjs.clientEdit.ClientSubbusiness;
        },
        onClientCancel: function () {
            this.state.clientQuickAdd = false;
            this.quickClientErr = 0;
            this.errors.clientName = null;
            this.errors.clientSubbusiness = null;
            this.formData.clientName = null;
            this.formData.clientSubbusiness = null;
            
        },
        onClientSubmit: function () {
            if (!validate.checkClientSubmit(this)) {
                return;
            }
            let quickClient = {
                clientName: this.formData.clientName,
                clientSubbusiness: this.formData.clientSubbusiness
            };
            this.formData.clientName = null;
            this.formData.clientSubbusiness = null;
            if (this.state.clientQuickAdd === true) {
                requests.quickAddClient(quickClient, this, this.formData.clientId);  
            }
            if (this.state.clientQuickEdit === true) {
                requests.quickEditClient(quickClient, this);
            }
                  
        },
        onOpportunityQuickAdd: function () {
            this.state.opportunityQuickAdd = true;
        },
        onOpportunityQuickEdit: function () {
            console.log('FIRED!!');
            this.state.opportunityQuickEdit = true;
            for (let i = 0; i < this.opportunities.length; i++) {
                if (this.formData.opportunityId === this.opportunities[i].opportunityId) {
                    this.editObjs.oppQuickEdit = this.opportunities[i];
                    this.editData.accountExecutiveUserId = this.opportunities[i].accountExecutiveUserId;
                    this.editData.unitId = this.opportunities[i].unitId;
                    this.editData.opportunityName = this.opportunities[i].opportunityName;
                    this.editData.clientContact = this.opportunities[i].clientContact;
                    this.editData.regionId = this.opportunities[i].regionId;
                    this.editData.opportunityNotes = this.opportunities[i].opportunityNotes;
                    this.editData.opportunityOwnerUserId = this.opportunities[i].opportunityOwnerUserId;
                    this.editData.soldStatusId = this.opportunities[i].soldStatusId;
                }
            }
            console.log('QUICK OBJ', this.editObjs.oppQuickEdit);
        },
        onOpportunityQuickEditSubmit: function () {
            requests.quickEditOpportunity(this);
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
                regionId: this.formData.regionId,
                soldStatusId: this.formData.soldStatusId,
                opportunityOwnerUserId: this.formData.opportunityOwnerUserId,
                opportunityNotes: this.formData.opportunityNotes
            }
            console.log('quick adding');
            requests.quickAddOpportunity(quickOpportunity, this);
        },
        onOpportunityCancel: function () {
            this.state.opportunityQuickAdd = false;
            this.state.opportunityQuickEdit = false;
            this.cancel();
            this.errors.opportunityName = null
            this.errors.accountExectuvieUserId = null;
            this.errors.unitId = null;
            this.errors.regionId = null;
            this.errors.opportunityNote = null;
            this.errors.clientContact = null;
            this.editData.accountExecutiveUserId = null;
            this.editData.unitId = null;
            this.editData.opportunityName = null;
            this.editData.clientContact = null;
            this.editData.regionId = null;
            this.editData.opportunityNote = null;
        },
        onOpportunityDetails() {
            for (let i = 0; i < this.opportunities.length; i++) {
                if (this.formData.opportunityId === this.opportunities[i].opportunityId) {
                    console.log(this.opportunities[i]);
                    this.oppDetails.accountExecutiveUserId = this.opportunities[i].accountExecutiveUserId;
                    this.oppDetails.unitId = this.opportunities[i].unitId;
                    this.oppDetails.opportunityName = this.opportunities[i].opportunityName;
                    this.oppDetails.clientContact = this.opportunities[i].clientContact;
                    this.oppDetails.regionId = this.opportunities[i].regionId;
                    this.oppDetails.opportunityNotes = this.opportunities[i].opportunityNotes;
                    if (this.opportunities[i].soldStatusId == 1) {
                        this.oppDetails.soldStatusId = "Yes";
                    } else {
                        this.oppDetails.soldStatusId = "No";
                    }
                    this.oppDetails.opportunityOwnerUserId = this.getUserName(this.opportunities[i].opportunityOwnerUserId);
                }
            }
            this.state.displayOppState = true;
            console.log(this.oppDetails);
        },
        displayFilters: function () {
            this.filters.displayFilters = !this.filters.displayFilters;
        },
        applyPriorityFilter: function () {
            this.getFilterStatus();
            requests.getMainData(this);
            this.sorting.sorter = null;
            this.filters.displayFilters = !this.filters.displayFilters;
        },
        getFilterStatus: function () {
            console.log('hello');
            console.log(this.filters);
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
        },
        sortTable: function (value) {
            sorting.sortData(value, this);
        },
        highlightCol(value) {
            if (value == this.sorting.sorter) {
                return true;
            } else {
                return false;
            }
        },
        getRegionName: function (regionId) {
            for (region in this.regions) {
                if (this.regions[region].RegionId == regionId) {
                    return (this.regions[region].RegionName);
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
        getAEName: function (AEId) { // pass ID and get name back
            for (ae in this.aes) {
                if (this.aes[ae].UserId == AEId) {
                    return (this.aes[ae].FullName);
                }
            }
        },
        getUserName: function (id) { // pass ID and get name back
            for (let i = 0; i < this.users.length; i++) {
                
                if (this.users[i].UserId == id) {
                    return this.users[i].UserFullName;
                }
            }
        },
        displayDate: function (date) {
            let returnDate = date;
            returnDate = parseInt(returnDate.slice(6));
            returnDate = new Date(returnDate);
            returnDate = returnDate.toISOString().slice(0, 10);
            return returnDate;
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
        requests.getGradeList(this);
        requests.getSoldStatusList(this);
        requests.getACTLeadList(this);
        this.getFilterStatus();
    },
    updated: function () {
       
        validate.checkErrors(this);
        validate.checkClientErrs(this);
        validate.checkOppErrs(this);
        
    }
});
Vue.config.devtools = true;