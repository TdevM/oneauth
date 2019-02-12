/**
 * Created by Tridev on 11-02-2019.
 */

const Raven = require('raven')
const router = require('express').Router()
const cel = require('connect-ensure-login')

const {
    findStatesByCountry
} = require('../../controllers/demographics')


router.get('/:id/states',
    async function(req, res) {
        try {
            let countryId = req.params.id
            const states = await findStatesByCountry(countryId)
            if(states.length>0){
                res.json(states)
            }else {
                req.flash('error','Cannot fetch states')
                return res.redirect('/address/add')
            }

        } catch (error) {
            Raven.captureException(error)
            req.flash('error', 'Could not fetch states')
            res.redirect('/users/me')
        }
    })

module.exports = router
