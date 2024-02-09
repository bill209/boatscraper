import puppeteer, { ConsoleMessage } from "puppeteer";




const getBoats = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  const yachtworld_url='https://www.yachtworld.com/boats-for-sale/type-power/class-power-trawler/country-united-states/region-southeast/length-34,44/price-50000,85000/fuel-diesel/pageSize=8';
  const boats_url='https://www.boats.com/boats-for-sale/?boat-type=power&class=power-trawler&price=30000-90000&distance=1200&postal-code=27602';
  const test_url='http://quotes.toscrape.com/';
  console.log('starting');
  await page.goto(yachtworld_url, {
    waitUntil: "domcontentloaded",
  });
  console.log('done waiting');
  
  // Get page data
  const results = await page.evaluate(() => {
    // Fetch the first element with class "quote"
    
    const container = document.querySelector('.container');
    const listings = container.querySelectorAll('a');  
    return Array.from(listings).map((listing) => {
      const listingName = listing.querySelector('[data-e2e="listingName"]').innerText;
      const listingPrice = listing.querySelector('[data-e2e="listingPrice"]').innerText;
      
      return {listingName, listingPrice};

      })
    
        // const boat_listings = document.querySelectorAll('[data-e2e="listingName"]');

        // return Array.from(boat_listings)
        //     .map((boat_listing) => {
        //         const model = boat_listing.innerText;
        //         console.log('m: ', model);
        //         return { model}
        //     });
    
  });

  // Display the quotes
  console.log(results);
  console.log('entries: ', results.length);
  // Close the browser
  await browser.close();
};


// Start the scraping
getBoats();