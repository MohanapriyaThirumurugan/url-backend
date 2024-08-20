import urlmodel from "../../components/database/urldata.js"
import dotenv from 'dotenv'

dotenv.config()

export const urlshortner= async(req,res,next)=>{
    try {
        const {bigurl} = req.body
         
         const timestamp = Date.now().toString(36); // Convert timestamp to Base36
         const randomStr = Math.random().toString(36).substr(2, 4); // Generate random string
         const str= timestamp + randomStr; // Combine both

           // You can then store this short URL in the database, for example:
         const newUrl = new urlmodel({ bigurl: bigurl, smallurl: str });
         await newUrl.save();

        res.status(200).send({
            smallurl: str,
            message :`str is suceffully created `
        })
    } catch (error) {
        res.status(500).send({
        message:"error",
        success:false
        
        })
    }

}

export const urlconntect = async (req, res, next) => {
  try {
    const { smallurl } = req.params;
    console.log("Received smallurl:", smallurl);

    const urldata = await urlmodel.findOneAndUpdate(
      { smallurl: smallurl },
      { $inc: { click: 1 } }, // Increment clickCount by 1
      { new: true } // Return the updated document
    );

    if (!urldata) {
      return res.status(404).send({
        message: "URL not found",
        success: false
      });
    }

    // Redirect to the original (big) URL
    res.redirect(urldata.bigurl);

  } catch (error) {
    res.status(500).send({
      message: "error",
      success: false
    });
  }
};



export const getclick=async(req,res,next)=>{
    
  try {
    

    const { smallurl } = req.params;
    if (!smallurl) {
        return res.status(400).send({
          success: false,
          message: 'Small URL identifier is required',
        });
      }

    const clickcount=await urlmodel.findOne({smallurl})
    if(!clickcount){
        res.status(404).send({
        message:'count not fount'
        })
    }
  res.status(200).send({
    success:true,
    clickcount:clickcount.click,
    message:`count has ${clickcount}`,
  })
    
  } catch (error) {
    res.status(500).send({
        message:"error",
        success:false
        
        })
  }

}

// export default {urlshortner, urlconntect }