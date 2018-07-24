
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
            rejectedCanddidate: null,
            proposedCandidate: null,
            duration: null,
            skillset: null,
            expectedStartDate: null,
            positionNote: null
        },
        state: {
            lastClientId: null,
            lastOppId: null,
            updateState: false
        },
        errors: {

        }
    },
    methods: {
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
                rejectedCanddidate: null,
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
            //CLEAR FORM
            this.clearForm();
            window.scrollTo(0, 0);
        },
        onSubmit: function () {
            if (this.state.updateState == true) {
                requests.editRow(this);
                return;
            }
 
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
            console.log('EDIT', post);
            console.log('EDIT OBJS', this.editObjs);
            // Populate edit tables.
            this.addState = true;
            this.state.updateState = true;
            this.displayState = false;

            //Populate client section of edit form
            this.formData.clientName = post.ClientName;
            this.formData.clientSubbusiness = post.ClientSubbusiness;
            //Populate opportunity section of edit form
            this.formData.opportunityName = post.OpportunityName;
            this.formData.accountExecutiveUserId = post.AE;
            this.formData.clientContact = post.ClientContact;
            console.log(post.OpportunityId);
            for (let i = 0; i < this.opportunities.length; i++) {
                if (post.OpportunityId == this.opportunities[i].opportunityId) {
                    this.formData.opportunityNotes = this.opportunities[i].opportunityNotes;
                    this.formData.regionId = this.opportunities[i].regionId;
                    this.formData.unitId = this.opportunities[i].unitId;
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
    }
});
Vue.config.devtools = true;