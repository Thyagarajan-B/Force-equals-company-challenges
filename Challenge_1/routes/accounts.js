const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
let companies = require('../data/companies');


router.get('/', authenticateToken, (req, res) => {
  res.json(companies);
});


router.post('/:id/status', authenticateToken, (req, res) => {
  const companyId = parseInt(req.params.id);
  const { status } = req.body;

  const company = companies.find(c => c.id === companyId);
  if (!company) return res.status(404).json({ message: "Company not found" });

  company.status = status;
  res.json({ message: "Status updated successfully", company });
});

module.exports = router;
