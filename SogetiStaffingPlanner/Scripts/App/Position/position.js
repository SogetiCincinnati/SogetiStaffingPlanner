
new Vue({
    el: '#app',
    data: {
        positions: '',
        title: 'Positions',
        addState: false,
        data: {},
        positionName: '',
        positionNumber: '',
        duration: '',
        acceptedCandidate: '',
        skillset: '',
        rate: '',
        expectedStartDate: '',
        hireCandidate: '',
        proposedCandidate: '',
        rejectedCandidate: '',
        positionNote: '',
        active: '',

    },
    methods: {
        onSubmit: function () {
            let data = {};
            data.positionName = this.positionName;
            data.positionNumber = this.positionNumber;
            data.duration = this.duration;
            data.acceptedCandidate = this.acceptedCandidate;
            
            data.skillset = this.skillset;
            data.rate = this.rate;
            data.expectedStartDate = this.expectedStartDate;
            data.hireCandidate = this.hireCandidate;
            data.proposedCandidate = this.proposedCandidate;
            data.rejectedCandidate = this.rejectedCandidate;
            data.positionNote = this.positionNote;
            data.active = this.active;
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
                    //alert('Client Name: "' + this.ClientName + '" and Client Subbusiness: "' + this.ClientSubbusiness + '" successfully added.');


                   
                }.bind(this),
                error: function (e) {
                    console.log(e, "Error adding data! Please try again.");
                }
            });
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

/*
 * data.positionId = this.newPosition.PositionId;
            data.opportunityId = this.newPosition.OpportunityId;
            data.unitPracticeId = this.newPosition.UnitPracticeId;
            data.maxConsultantGradeId = this.newPosition.MaxConsultantGradeId;
            data.minConsultantGradeId = this.newPosition.MinConsultantGradeId;
            data.positionName = this.newPosition.PositionName;
            data.numberOfPositions = this.newPosition.NumberOfPositions;
            data.skillset = this.newPosition.Skillset;
            data.rate = this.newPosition.Rate;
            data.expectedStartDate = this.newPosition.ExpectedStartDate;
            data.duration = this.newPosition.Duration;
            data.proposedCandidate = this.newPosition.ProposedCandidate;
            data.rejectedCandidate = this.newPosition.RejectedCandidate;
            data.acceptedCandidate = this.newPosition.AcceptedCandidate;
            data.positionNote = this.newPosition.PositionName;
        */