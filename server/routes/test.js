var router = require("express").Router();
var Test = require("../models/test");
const puppeteer = require('puppeteer');
var resemble = require('resemblejs-node');
const fs = require("mz/fs");
var mongoose = require("mongoose");

router.post("/", function(req, res) {
	takeScreenshot("https://wrravelo2021.github.io/ColorPalette/", res);
});

router.get("/", function(req, res) {
	Test.find({}).sort({createdAt: -1}).exec(function(err,docs){
		if(err) throw err;
		res.json(docs);
	});
});

const takeScreenshot = async(url, res) => {
	let basePathServer = "client/img/tests/";
	let basePathClient = "./img/tests/";
	let generatedName = (new Date()).toISOString();
	let first = generatedName + "-firstPhoto.png";
	let second = generatedName + "-secondPhoto.png";
	let result = generatedName + "-diff.png";
	const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
	const page = await browser.newPage();
	await page.goto(url);
	await page.evaluate(() => {
		document.getElementById("generateReport").click();
	});
	await page.screenshot({path: basePathServer + first});
	await page.evaluate(() => {
		document.getElementById("generateReport").click();
	});
	await page.screenshot({path: basePathServer + second});
	await browser.close();

	let diff = resemble(basePathServer + first).compareTo(basePathServer + second).ignoreColors();
	let diffResult = await new Promise((resolve) => diff.onComplete(resolve));
	diffResult.getDiffImage().pack().pipe(fs.createWriteStream(basePathServer + result));

	var newTest = new Test({
		_id: new mongoose.Types.ObjectId(),
		beforePhoto: basePathClient + first,
		afterPhoto: basePathClient + second,
		diffPhoto: basePathClient + result,
		results: {
			misMatchPercentage: diffResult.misMatchPercentage,
			isSameDimension: diffResult.isSameDimensions,
			dimensionDifference: diffResult.dimensionDifference
		}
	});

	newTest.save(function(err) {
		if(err) res.json({success: false});
		res.json({success: true})
	});
}

module.exports = router;
