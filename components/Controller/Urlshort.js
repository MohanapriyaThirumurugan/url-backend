import urlmodel from "../../components/database/urldata.js";
import dotenv from 'dotenv';

dotenv.config();

// URL shortener to generate short URL
export const urlshortner = async (req, res, next) => {
  try {
    const { bigurl } = req.body;

    const timestamp = Date.now().toString(36); // Convert timestamp to Base36
    const randomStr = Math.random().toString(36).substr(2, 4); // Generate random string
    const str = timestamp + randomStr; // Combine both

    // Store this short URL in the database
    const newUrl = new urlmodel({ bigurl: bigurl, smallurl: str });
    await newUrl.save();

    res.status(200).send({
      smallurl: str,
      message: "Short URL successfully created"
    });
  } catch (error) {
    res.status(500).send({
      message: "Error occurred",
      success: false
    });
  }
};

// URL connection: Increment click count and redirect to big URL
export const urlconnect = async (req, res, next) => {
  try {
    const { smallurl } = req.params;

    // Increment click count
    const urldata = await urlmodel.findOneAndUpdate(
      { smallurl: smallurl },
      { $inc: { click: 1 } }, // Increment click count by 1
      { new: true } // Return the updated document
    );

    if (!urldata) {
      return res.status(404).send({
        message: "URL not found",
        success: false
      });
    }

    // Redirect to the original big URL
    res.redirect(urldata.bigurl);
  } catch (error) {
    res.status(500).send({
      message: "Error occurred",
      success: false
    });
  }
};

// Get click count for a specific short URL
export const getclick = async (req, res, next) => {
  try {
    const { smallurl } = req.params;

    const clickcount = await urlmodel.findOne({ smallurl });

    if (!clickcount) {
      return res.status(404).send({
        message: "Count not found",
        success: false
      });
    }

    res.status(200).send({
      success: true,
      clickcount: clickcount.click,
      message: `Click count: ${clickcount.click}`
    });
  } catch (error) {
    res.status(500).send({
      message: "Error occurred",
      success: false
    });
  }
};
