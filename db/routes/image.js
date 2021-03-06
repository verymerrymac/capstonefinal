var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const Clarifai = require('clarifai');
const Search = require('azure-cognitiveservices-imagesearch');
const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
let https = require('https');
let axios = require('axios');
const u = require('unirest'); //intsall from: http://unirest.io/nodejs.html


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
    console.log('hey')
    const imageSrc = req.body.imageSrc;    
    // console.log(imageSrc)

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



router.get('/bing/celebName/:name', (req, res, next) => {
    console.log('start')

    //Replace the following string value with your valid X-RapidAPI-Key.
    
    Your_X_RapidAPI_Key = "0771d630cfmsh28dc1ea910c0efbp1ccf17jsne1c1c73dbf84";
    //The query parameters: (update according to your search query)
    q = req.params.name
    pageNumber = 1;
    pageSize = 10; 
    autoCorrect = true; 
    safeSearch = false; 
    
    u.get("https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=" + q + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize+ "&autoCorrect=" + autoCorrect+ "&safeSearch=" + safeSearch)
        .header("X-RapidAPI-Key", Your_X_RapidAPI_Key)
        .end(function(result) {
            // console.log(result.body.value[i])
            res.send(result.body.value[0].url)
    
            // console.log("HTTP status code: " + result.status);
    
            //Get the numer of items returned
            // totalCount = result.body["totalCount"];

            // let array = []
            // let num = 1
            // array.push(result.body.value[i].url);
            // for (i = 0; i < num; i++) {
            //     res.send(result.body.value[i].url)
            // }


                // //Get the image
                // imageUrl = image["url"];
                // imageHeight = image["height"];
                // imageWidth = image["width"];
    
                // //Get the image thumbail
                // thumbnail = image["thumbnail"];
                // thumbnailHeight = image["thumbnailHeight"];
                // thumbnailWidth = image["thumbnailWidth"];
    
                // //An example: Output the webpage url, title and published date:
                // console.log("imageUrl: %s. imageHeight: %s. imageWidth: %s.\n", imageUrl, imageHeight, imageWidth);
            // }
        
        });
    });

// router.get('/bing/celebName/:name', (request, reply, next) => {
// let subscriptionKey = '62dac51e1263428f903a5b70f3c5f659'
// let term = request.params.name;
// let url = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=' + encodeURIComponent(term)

// let request_params = {
//     headers : {
//     'Ocp-Apim-Subscription-Key' : subscriptionKey,
//     }
// };

// axios.get(url, request_params)
//     .then(res => reply.send(res.data))
//     .catch(err => console.log(err))

// })

// router.get('/bing/celebName', (req, res, next) => {

//     //replace this value with your valid subscription key.
//     let serviceKey = "62dac51e1263428f903a5b70f3c5f659";

//     //the search term for the request
//     let searchTerm = req.body.celebName;
//     console.log("searchTerm")

//     //instantiate the image search client 
//     let credentials = new CognitiveServicesCredentials(serviceKey);
//     let imageSearchApiClient = new Search.ImageSearchAPIClient(credentials);

//     //a helper function to perform an async call to the Bing Image Search API
//     const sendQuery = async () => {
//         return await imageSearchApiClient.imagesOperations.search({searchTerm});
//     };

//     sendQuery().then(imageResults => {
//         if (imageResults == null) {
//         console.log("No image results were found.");
//         }
//         else {
//             console.log(`Total number of images returned: ${imageResults.value.length}`);
//             let firstImageResult = imageResults.value[0];
//             //display the details for the first image result. After running the application,
//             //you can copy the resulting URLs from the console into your browser to view the image.
//             console.log(`Total number of images found: ${imageResults.value.length}`);
//             console.log(`Copy these URLs to view the first image returned:`);
//             console.log(`First image thumbnail url: ${firstImageResult.thumbnailUrl}`);
//         }
//     })
//     .catch(err => console.error(err))

// })
// // // res.sendFile();




module.exports = router;
