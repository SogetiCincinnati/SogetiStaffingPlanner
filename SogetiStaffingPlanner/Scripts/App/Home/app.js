
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
            clientEdit: null
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
            expectedStartDate: null
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
        cancel: function () {
            this.errors = {};
            this.addState = false;
            window.scrollTo(0, 0);
        },
        onSubmit: function () {
            if (this.state.updateState == true) {
                requests.editRow(this);
                return;
            }
 
            requests.addRow(clientObj, this);
        },
        onEdit: function (post) {
            this.addState = true;
            this.state.updateState = true;
            this.formData.accountExecutiveUserId = post.AE;
            this.formData.regionId = 1;
            this.formData.opportunityName = post.OpportunityName;
           // unitId: null,
            this.formData.numberOfPositions = post.NumberOfPositions;
            this.formData.positionName = post.PositionName;
            //soldStatus: null,
            this.formData.positionStatusId = post.PositionStatusId;
            this.formData.positionNote = post.PositionNote;
            this.formData.clientName = post.ClientName;
            this.formData.clientSubbusiness = post.ClientSubbusiness;
            this.formData.clientContact = post.ClientContact;
            this.formData.rate = post.Rate;
            this.formData.acceptedCandidate = post.AcceptedCandidate;
            this.formData.hiredCandidate = post.HireCandidate;
            this.formData.rejectedCandidate = post.RejectedCandidate;
            this.formData.proposedCandidate = post.ProposedCandidate;
            this.formData.duration = post.Duration;
            let oppToFetchId = null;

            for (let i = 0; i < this.opportunities.length; i++) {
                if (post.OpportunityName == this.opportunities[i].opportunityName) {
                    this.formData.unitId = this.opportunities[i].unitId;
                    this.formData.opportunityNotes = this.opportunities[i].opportunityNotes;
                    oppToFetchId = this.opportunities[i].positionId;
                }
            }

            for (let i = 0; i < this.clients.length; i++) {
                if (this.formData.clientName == this.clients[i].ClientName) {
                    
                    this.editObjs.clientEdit = this.clients[i];
                }
            }
        
           

        },
        displayDetails: function (data) {
            this.displayState = true;
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
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "Home/GetMainData",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log('Posts', data);
                this.posts = data;
            }.bind(this), error: function (e) {
                console.log('error');
                console.log(e);
            }
        });
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "Client/GetUserList",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log('Users', data);
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