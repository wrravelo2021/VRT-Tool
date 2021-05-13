const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
	createdAt: { type: Date, default: Date.now  },
	beforePhoto: String,
	afterPhoto: String,
	diffPhoto: String,
	results: {
		misMatchPercentage: String,
		isSameDimension: Boolean,
		dimensionDifference: {
			width: Number,
			height: Number
		}
	}
});

module.exports = mongoose.model("Test", TestSchema);
