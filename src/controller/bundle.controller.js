// eslint-disable-next-line new-cap
const router = require('express').Router();
const logger = require('../utils/logger');
const jwtUtils = require('../utils/jwt-utils');
const upload = require('../interface/storage.interface');
const bundleservice = require('../service/bundle.service');
router.use((req, res, next) => {
    try {
      const token = req.headers.authorization;
      const userinfo = jwtUtils.validateToken(token);
      if (userinfo) {
        // Log an info message for each incoming request
        logger.info(`Received a request for ${req.url} from ${userinfo.userId}`);
        next();
      } else {
        res.status(401).send();
      }
    } catch (err) {
      res.status(401).send(err.message);
    }
  });

router.put('', upload.single('file'),async (req, res)=>{
  try {
    if(!req.file){
        return res.status(400).json({ error: 'No file provided' });
    }else{
        await bundleservice.bundleUploadNotifier(req.file.originalname);
        return res.sendStatus(201);
    }
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;