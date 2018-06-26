
new Vue({
    el: '#app',
    data: {
        positions: '',
        positionDetail: null,
        title: 'Positions',
        addState: false,
        moreState: false,
        updateState: false,
        numberOfPositions: '',
        positionName: '',
        positionId: null,
        opportunityId: null,
        unitPracticeId: null,
        maxConsultantGradeId: null,
        minConsultantGradeId: null,
        numberOfPositions: null,
        duration: '',
        acceptedCandidate: '',
        skillset: '',
        rate: '',
        expectedStartDate: '',
        hireCandidate: '',
        proposedCandidate: '',
        rejectedCandidate: '',
        positionStatusId: '',
        positionNote: ''
    },
    methods: {
        onSubmit: function () {
            let data = {};
            data.positionId = 1;
            data.opportunityId = 1;
            data.unitPracticeId = 1;
            data.maxConsultantGradeId = 1;
            data.minConsultantGradeId = 1;
            data.numberOfPositions = 1;
            data.positionName = this.positionName;
            data.duration = this.duration;
            data.acceptedCandidate = this.acceptedCandidate;
            data.skillset = this.skillset;
            data.rate = this.rate;
            data.expectedStartDate = this.expectedStartDate;
            data.hireCandidate = this.hireCandidate;
            data.proposedCandidate = this.proposedCandidate;
            data.rejectedCandidate = this.rejectedCandidate;
            data.positionStatusId = 1;
            data.positionNote = this.positionNote;
            console.log(data);

            $.ajax({
                type: "POST",
                url: "AddPosition",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    //Receives message from backend for you to do what you want with it
                    console.log('POST request success');
                    alert('successfully added');
                }.bind(this),
                error: function (e) {
                    console.log(e);
                    console.log(e, "Error adding data! Please try again.");
                }
            });
        },
        displayDetail: function (position) {
            this.positionDetail = position;
            console.log(this.positionDetail);
            this.moreState = true;
        }
    },
    created: function () {
        $.ajax({
            async: false,
            cache: false,
            type: "GET",
            url: "GetPosition",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                
                console.log(data);
                this.positions = data;
                console.log(this.positions);
            }.bind(this)
        })
    }
})