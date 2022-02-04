const Booking = require('../models/booking_model')
const {booking_valid} = require('../auth/valid')
exports.booking = async(req,res)=>{

    try {
        // checking data validation
        const { error } = booking_valid(req.body)
        if (error) {
            return res.json(error.details[0].message)
        }
        // email check for not dubplicate 
           const bookingUser = await Booking.findOne({ email: req.body.email })
           console.log(bookingUser)
           if (bookingUser){
               return res.json('one time one email used')
           }

        // //phone number shoube different
        const bookingUserphone = await Booking.findOne({ phone: req.body.phone })
           if(bookingUserphone){
               return res.json('phone number only once time used')
           }

        //new data model create
        const bookingData = new Booking
            ({
                name: req.body.name,
                email: req.body.email,
                phone:req.body.phone,
                city:req.body.city,
                state:req.body.state,
                date:req.body.date,
                message: req.body.message
            })


        try {
            //save to database
            const result = await bookingData.save()
            const {...data} =result._doc
            res.json(data)
        } catch (error) {
            res.send(error)
        }

    } catch (error) {
        res.send(error)
    }

}

