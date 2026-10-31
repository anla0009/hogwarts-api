import * as housesRepository from '../repositories/houses.repository.js';

export async function getHouses(req, res) {
  const houses = await housesRepository.getAllHouses();
  res.status(200).json(houses);
}

export async function getHouse(req, res) {
  const house = await housesRepository.getHouseById(req.params.id);
  if (!house) return res.status(404).json({ error: 'House findes ikke' });
  res.status(200).json(house);
}
