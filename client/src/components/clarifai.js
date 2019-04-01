// Initialize Clarifai api
    
    const Clarifai = require('clarifai');

    const app = new Clarifai.App({
        apiKey: '8469266d2783471ead47f572d20b4171'
    });

    // Identify the image
    app.models.predict("e466caa0619f444ab97497640cefc4dc", {base64: imageSrc})
    .then((response) => this.displayAnswer(response.outputs[0].data.concepts[0].name)
    .catch((err) => alert(err))
    );

