const express = require("express");
const router = express.Router();
const appointment = require("../models/appointment");

router.get("/emp_avg", async function (req, res) {
  try {
    res.json(
      await appointment.aggregate([
        { $unwind: "$services" },
        {
          $lookup: {
            from: "users",
            localField: "services.emp",
            foreignField: "_id",
            as: "emp",
          },
        },
        { $unwind: "$emp" },
        {
          $group: {
            _id: "$services.emp",
            avgDuration: { $avg: "$services.duration" },
            emp: { $first: "$emp" },
          },
        },
        {
          $project: {
            avgDuration: 1,
            "emp._id": 1,
            "emp.name": 1,
            "emp.profile": 1,
          },
        },
      ])
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/day", async function (req, res) {
  try {
    let min = req.query.min ? new Date(req.query.min) : new Date();
    min.setUTCHours(0, 1);
    if(!req.query.min){
      min.setDate(min.getDate() - 7);
    }
    let max = req.query.max ? new Date(req.query.max) : new Date();
    max.setUTCHours(23, 59);
    console.log(min);
    res.json(
      await appointment.aggregate([
        {
          $match: {
            date: {
              $gte: min,
              $lte: max,
            },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%d/%m/%Y", date: "$date" } },
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ])
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/month", async function (req, res) {
  try {
    res.json(
      await appointment.aggregate([
        {
          $group: {
            _id: {
              month: { $month: "$date" },
              year: { $year: "$date" },
            },
            count: { $sum: 1 },
          },
        },
      ])
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/day/ca", async function (req, res) {
  try {
    let min = req.query.min ? new Date(req.query.min) : new Date();
    min.setUTCHours(0, 0);
    if(!req.query.min){
      min.setDate(min.getDate() - 7);
    }
    let max = req.query.max ? new Date(req.query.max) : new Date();
    max.setUTCHours(23, 59);
    res.json(
      await appointment.aggregate([
        {
          $unwind: "$services",
        },
        {
          $match: {
            date: {
              $gte: min,
              $lte: max,
            },
            payment: { $ne: null },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%d/%m/%Y", date: "$date" } },
            total: {
              $sum: "$payment.amount",
            },
            committee: {
              $sum: {
                $multiply: [
                  "$services.price",
                  { $divide: ["$services.committee", 100] },
                ],
              },
            },
          },
        },
        {
          $project: {
            _id: "$_id",
            total: "$total",
            committee: "$committee",
            balance: {
              $subtract: ["$total", "$committee"],
            },
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ])
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/month/ca", async function (req, res) {
  try {
    res.json(
      await appointment.aggregate([
        {
          $unwind: "$services",
        },
        {
          $match: {
            payment: { $ne: null },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: "$date" },
              year: { $year: "$date" },
            },
            total: {
              $sum: "$payment.amount",
            },
            committee: {
              $sum: {
                $multiply: [
                  "$services.price",
                  {
                    $divide: ["$services.committee", 100],
                  },
                ],
              },
            },
          },
        },
        {
          $project: {
            _id: "$_id",
            total: "$total",
            committee: "$committee",
            balance: {
              $subtract: ["$total", "$committee"],
            },
          },
        },
        {
          $sort: {
            "id.year": -1,
            "_id.month": -1,
          },
        },
      ])
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/month/bonus", async function (req, res) {
  try {
    res.json(
      await appointment.aggregate([
        {
          $unwind: "$services",
        },
        {
          $match: {
            payment: { $ne: null },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: "$date" },
              year: { $year: "$date" },
            },
            total: {
              $sum: "$payment.amount",
            },
            committee: {
              $sum: {
                $multiply: [
                  "$services.price",
                  {
                    $divide: ["$services.committee", 100],
                  },
                ],
              },
            },
          },
        },
        {
          $project: {
            _id: "$_id",
            total: "$total",
            committee: "$committee",
            balance: {
              $subtract: ["$total", "$committee"],
            },
          },
        },
        {
          $unionWith: {
            coll: "spents",
            pipeline: [
              {
                $group: {
                  _id: {
                    month: { $month: "$date" },
                    year: { $year: "$date" },
                  },
                  spent: {
                    $sum: "$amount",
                  },
                },
              },
              {
                $project: {
                  _id: "$_id",
                  spent: "$spent",
                },
              },
            ],
          },
        },
        {
          $group: {
            _id: "$_id",
            sell: { $sum: "$balance" },
            spent : { $sum:"$spent" },
          },
        },
        {
          $project:{
            _id:"$_id",
            sell:"$sell",
            spent:"$spent",
            balance:{ $subtract:["$sell","$spent"] }
          }
        },
        {
          $sort: {
            "_id.year": -1,
            "_id.month": -1,
          },
        },
      ])
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
