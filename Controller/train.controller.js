const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.createTrain = async (req, res) => {
  try {
    const {
      trainname,
      source,
      destination,
      seatcapacity,
      arrivaltimesource,
      arrivaltimedestination,
    } = req.body;

    const newTrain = await prisma.train.create({
      data: {
        trainname,
        source,
        destination,
        seatcapacity,
        arrivaltimesource,
        arrivaltimedestination,
        availableSeats: seatcapacity,
      },
    });

    res.status(200).json({
      success: true,
      message: "Train added successfully",
      train: newTrain,
      train_id: newTrain.id,
    });
  } catch (error) {
    console.error('Error adding train:', error); 
    if (error.code === 'P2002' && error.meta.target.includes('trainname')) {
      return res.status(400).json({
        success: false,
        message: 'Train name already exists. Please choose a unique name.',
      });
    }
    res.status(400).json({
      success: false,
      message: 'Train could not be added',
      error: error.message,
    });
  }
};

exports.trainAvailability = async (req, res) => {
  try {
    const { source, destination } = req.query;

    const trains = await prisma.train.findMany({
      where: {
        source,
        destination,
      },
      select: {
        id: true,
        trainname: true,
        availableSeats: true,
      },
    });

    res.status(200).json(trains);
  } catch (error) {
    console.error("Error fetching train availability:", error);
    res.status(500).json({
      success: false,
      message: 'Could not fetch trains',
      error: error.message,
    });
  }
};

exports.trainBooking = async (req, res) => {
  try {
    const { trainid } = req.params;
    const { noofseats, userid } = req.body;

    const result = await prisma.$transaction(async (prisma) => {
      
      const train = await prisma.train.findUnique({
        where: {
          id: trainid,
        },
      });

      if (!train) {
        throw new Error('Train not found');
      }

      if (train.availableSeats < noofseats) {
        throw new Error('Not enough seats available');
      }

     
      const updatedTrain = await prisma.train.update({
        where: { id: trainid },
        data: {
          availableSeats: train.availableSeats - noofseats,
        },
      });

     
      const booking = await prisma.booking.create({
        data: {
          userid,
          trainid,
          noofseats,
        },
      });

      return { updatedTrain, booking };
    });

    res.status(200).json({
      message: "Seat booked successfully",
      booking_id: result.booking.id,
    });
  } catch (error) {
    console.error("Error booking train:", error);
    res.status(500).json({
      success: false,
      message: 'Booking failed',
      error: error.message,
    });
  }
};


exports.getBookingDetails = async (req, res) => {
  try {
    const { bookingid } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingid },
      include: {
        train: {
          select: {
            id: true,
            trainname: true,
            arrivaltimesource: true,
            arrivaltimedestination: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      bookingId: booking.id,
      trainId: booking.train.id,
      trainName: booking.train.trainname,
      userId: booking.user.id,
      noOfSeats: booking.noofseats,
      arrivalSource: booking.train.arrivaltimesource,
      arrivalDestination: booking.train.arrivaltimedestination,
    });
  } catch (error) {
    console.error("Error fetching booking details:", error);
    res.status(500).json({
      success: false,
      message: 'Could not fetch booking details',
      error: error.message,
    });
  }
};
