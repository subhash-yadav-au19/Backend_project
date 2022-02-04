const Booking = require('../models/booking_model')
const { booking_valid } = require('../auth/valid')


//by create the booking by admin
exports.newBooking = async (req, res) => {
    try {
        // checking data validation
        const { error } = booking_valid(req.body)
        if (error) {
            return res.json(error.details[0].message)
        }
        // email check for not dubplicate 
        const bookingUser = await Booking.findOne({ email: req.body.email })
        if (bookingUser) {
            return res.json('one time one email used')
        }

        // //phone number shoube different
        const bookingUserphone = await Booking.findOne({ phone: req.body.phone })
        if (bookingUserphone) {
            return res.json('phone number only once time used')
        }

        //new data model create
        const bookingData = new Booking
            ({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                city: req.body.city,
                state: req.body.state,
                date: req.body.date,
                message: req.body.message
            })


        try {
            //save to database
            const result = await bookingData.save()
            const { ...data } = result._doc
            res.json(data)
        } catch (error) {
            res.send(error)
        }

    } catch (error) {
        res.send(error)
    }

}


//read booking by admin
exports.searchBooking = (req, res) => {
    const id = req.params.id
    res.send('serach' + id)
}


// delete the booking
exports.deleteBooking = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.send({ message: 'id not provided' })
        }

        const deleteData = await Booking.findByIdAndDelete(id)
        try {
            if (!deleteData) {
                res.status(404).send({ message: `cannot delete with id ${id} may be wrong ` })
            }
            else {
                res.send({ message: "user was deleted successfully" })
            }

        } catch (error) {
            res.status(500).send('error occuring to retriving the data')
        }

    } catch (error) {
        res.send(error)
    }
}


//update the booking
exports.updateBooking = async (req, res) => {
    try {
        const newData = req.body
        if (!newData) {
            return res.status(400).send({ message: "data to update can not be empty" })
        }

        const id = req.params.id
        const data = await Booking.findByIdAndUpdate(id, req.body)
        try {
            if (!data) {
                res.status(404).send({ message: `cannot update user with ${id} maybe user id not found` })
            }
            else {
                res.send(data)
            }
            
        } catch (error) {
            res.status(500).send('error occuring to retriving the data')
        }
       

    } catch (error) {
        res.send(error).status(500)
    }
}


exports.latestSchedule = (req, res) => {
    res.send('latest schedule booking')
}