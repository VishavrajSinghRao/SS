const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/take-screenshot', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:3000'); 

   
    const screenshot = await page.screenshot();
    await browser.close();

    // Send screenshot back as PNG image
    res.setHeader('Content-Type', 'image/png');
    res.send(screenshot);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
