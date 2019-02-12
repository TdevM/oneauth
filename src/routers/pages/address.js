const router = require('express').Router()
const cel = require('connect-ensure-login')
const Raven = require('raven')

const {
    findAddress,
    findAllAddresses,
    findStatesByCountry,
    findAllCountries,
    findAllStates
} = require('../../controllers/demographics');

router.get('/',
    cel.ensureLoggedIn('/login'),
    async function (req, res, next) {
        try {
            const addresses = await findAllAddresses(req.user.id)
            return res.render('address/all', {addresses})
        } catch (error) {
            Raven.captureException(error)
            req.flash('error', 'Something went wrong trying to query address database')
            return res.redirect('/users/me')
        }
    }
)

router.get('/add',
    cel.ensureLoggedIn('/login'),
    async function (req, res, next) {
        if (req.query && req.query.returnTo) {
            req.session.returnTo = req.query.returnTo
            res.locals.returnTo = req.query.returnTo
        }
        try {
            const [states, countries] = await Promise.all([
                findAllStates(),
                findAllCountries()
            ])
            return res.render('address/add', {states, countries})
        } catch (error) {
            Raven.captureException(error)
            res.send("Error Fetching Data.")
        }
    }
)

router.get('/:id',
    cel.ensureLoggedIn('/login'),
    async function (req, res, next) {
        try {
            const address = await findAddress(req.params.id, req.user.id);
            if (!address) {
                req.flash('error', 'Address not found')
                return res.redirect('.')
            }
            return res.render('address/id', {address})
        } catch (error) {
            Raven.captureException(error)
            req.flash('error', 'Something went wrong trying to query address database')
            return res.redirect('/users/me')
        }
    }
)


router.get('/:id/edit',
    cel.ensureLoggedIn('/login'),
    async function (req, res, next) {
        try {
            const [address, countries] = await Promise.all([
                findAddress(req.params.id, req.user.id),
                findAllCountries()
            ])

            if (!address) {
                req.flash('error', 'Address not found')
                return res.redirect('.')
            }
            const statesByCountry = await findStatesByCountry(address.get('country').id)
            return res.render('address/edit', {address, statesByCountry, countries})
        } catch (err) {
            Raven.captureException(err)
            req.flash('error', 'Something went wrong trying to query address database')
            return res.redirect('/users/me')
        }
    }
)

module.exports = router
