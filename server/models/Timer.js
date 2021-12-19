const { Schema } = require('mongoose');

const timerSchema = new Schema({
    
    workTime: {
        type: Number,
        required: true,
        default: 25,
        max: [60, "Must be less than 60, got {VALUE}"],
        min: [1, "Must be at least 1, got {VALUE}"]
    },

    breakTime: {
        type: Number,
        required: true,
        default: 5,
        max: [60, "Must be less than 60, got {VALUE}"],
        min: [1, "Must be at least 1, got {VALUE}"]
    }
});

// check pre creation at validation step that breakTime is less than or equal to workTime
// timerSchema.pre('validate', function(next) {
//     if (this.breakTime > this.workTime) {
//         this.invalidate('breakTime', 'Break duration cannot be longer than Work duration', this.breakTime); 
//     }

//     next(); 
// })

module.exports = timerSchema; 