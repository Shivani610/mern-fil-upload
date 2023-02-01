const { multidocUpload } = require("../utils/upload")
const multiDocs = require("./../models/Doc")
exports.addDocController = async (req, res) => {
    try {
        multidocUpload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "multer error" + err
                })
            }
            if (req.files.dob) {
                req.body.userDob = `dob/${req.files.dob[0].filename}`
            }

            if (req.files.adhar) {
                req.body.userAdhar = `adhar/${req.files.adhar[0].filename}`
            }

            if (req.files.tc) {
                req.body.userTc = `tc/${req.files.tc[0].filename}`
            }
            const result = await multiDocs.create(req.body)
            // console.log(req.files.dob[0].filename);
            // console.log(req.files.adhar[0].filename);

            // console.log(req.file);
            res.json({
                success: true,
                message: "MultiDoc upload successfully"
            })
        })
    } catch (error) {
        res.status(400).json({
            success: true,
            message: "Error" + error
        })
    }
}
exports.getAllMultiDoc = async (req, res) => {
    try {
        const result = await multiDocs.find()
        res.json({
            success: true,
            message: "Doc Fetch SuccessFully",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Error" + error
        })
    }
}
// ORM=OBJECT RELATIONAL MAPPING