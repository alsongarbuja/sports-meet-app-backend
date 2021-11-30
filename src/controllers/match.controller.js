const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { matchService } = require('../services');
const { jsend } = require('../utils/jsend');

const createMatch = catchAsync(async (req, res) => {
  const match = await matchService.createMatch(req.body);
  res.status(httpStatus.CREATED).send(jsend(match));
});

const getMatches = catchAsync(async (req, res) => {
  const result = await matchService.getMatches();
  res.send(jsend(result));
});

const getMatch = catchAsync(async (req, res) => {
  const match = await matchService.getMatchById(req.params.matchId);
  if (!match) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Match not found');
  }
  res.send(jsend(match));
});

const updateMatch = catchAsync(async (req, res) => {
  const match = await matchService.updateMatchById(req.params.matchId, req.body);
  res.send(jsend(match));
});

const deleteMatch = catchAsync(async (req, res) => {
  await matchService.deleteMatchById(req.params.matchId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMatch,
  getMatches,
  getMatch,
  updateMatch,
  deleteMatch,
};