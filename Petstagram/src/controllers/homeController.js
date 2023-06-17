const photoManager = require('../managers/photoManager');
const { isAuth } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/profile', isAuth, async (req, res) => {
    const photos = await photoManager.getByOwner(req.user._id).lean();

    res.render('profile', { photos, photoCount: photos.length });
});

router.get('/404', (req, res) => {
    res.render('404');
})
module.exports = router;