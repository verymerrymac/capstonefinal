var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const Clarifai = require('clarifai');
const Search = require('azure-cognitiveservices-imagesearch');
const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;

router.post('/save', ((req, res, next) => {
    // const imgTimeStamp = new Date().getTime().toString();

    // to declare some path to store your converted image
    const curDir = (__dirname);
    const dbDir = curDir.slice(0,curDir.length-6);

    const directory = 'images/';
    const image = `${req.body.username}.jpeg`;

    // image takes from body which you uploaded
    const imgdata = req.body.imageSrc;    

    // to convert base64 format into random filename
    const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');

    fs.writeFile(dbDir + directory + image, base64Data, 'base64', (err) => {
        if (err) throw err;
        res.send("Ok")
    });
}));

router.get(`/:username/findImage`, (req, res, next) => {
    const curDir = (__dirname);
    const dbDir = curDir.slice(0,curDir.length-6);
    const directory = 'images/';

    const image = `${req.params.username}.jpeg`;

    const imagePath = dbDir + directory + image;
    console.log(imagePath)
    res.sendFile(path.resolve(imagePath));
})

router.post('/clarifai', (req, res, next) => {
    const imageSrc = req.body.imageSrc;    
    console.log(imageSrc)

    const app = new Clarifai.App({
        apiKey: '8469266d2783471ead47f572d20b4171'
    });

    // Identify the image
    var parsedImageData = imageSrc.split("data:image/jpeg;base64,");

    app.models.predict("e466caa0619f444ab97497640cefc4dc", {base64: parsedImageData[1]})
    .then((response) => {
        console.log("Pleasework")
        res.send(response)
    })
    .catch((err) => console.log(err))
})

router.get('/bing/celebName', (req, res, next) => {

    //replace this value with your valid subscription key.
    let serviceKey = "1c7f2d9c-db18-4076-bb1b-d5ce259ed294";

    //the search term for the request
    let searchTerm = req.body.celebName;
    console.log("searchTerm")

    //instantiate the image search client 
    let credentials = new CognitiveServicesCredentials(serviceKey);
    let imageSearchApiClient = new Search.ImageSearchAPIClient(credentials);

    //a helper function to perform an async call to the Bing Image Search API
    const sendQuery = async () => {
        return await imageSearchApiClient.imagesOperations.search({searchTerm});
    };

    sendQuery().then(imageResults => {
        if (imageResults == null) {
        console.log("No image results were found.");
        }
        else {
            console.log(`Total number of images returned: ${imageResults.value.length}`);
            let firstImageResult = imageResults.value[0];
            //display the details for the first image result. After running the application,
            //you can copy the resulting URLs from the console into your browser to view the image.
            console.log(`Total number of images found: ${imageResults.value.length}`);
            console.log(`Copy these URLs to view the first image returned:`);
            console.log(`First image thumbnail url: ${firstImageResult.thumbnailUrl}`);
        }
    })
    .catch(err => console.error(err))

})
// res.sendFile();




module.exports = router;


