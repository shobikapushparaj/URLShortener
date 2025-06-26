const express = require('express');
const router = express.Router();

const {createLink,getAllLinks,updateLink,deleteLink,redirectSlug} = require('../controller/appcontroller');


router.post('/api/links', createLink);
router.get('/api/links', getAllLinks);
router.put('/api/links/:id', updateLink);
router.delete('/api/links/:id', deleteLink);

router.get('/r/:slug', redirectSlug);

module.exports = router;
