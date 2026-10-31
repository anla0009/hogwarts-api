// Oversætter fejl (fx fra databasen) til rigtige statuskoder.
// 500 bruges kun til fejl, vi ikke havde forudset.
export function errorHandler(err, req, res, next) {
  // Ugyldig JSON i body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Ugyldig JSON' });
  }
  // Ugyldig værdi, fx et id der ikke er et tal
  if (err.code === '22P02') {
    return res.status(400).json({ error: 'Ugyldig værdi' });
  }
  // Manglende påkrævet værdi
  if (err.code === '23502') {
    return res.status(400).json({ error: 'Der mangler en værdi' });
  }
  // Foreign key: enten henviser den til noget, der ikke findes, eller også bruges rækken af noget andet
  if (err.code === '23503') {
    if (err.detail && err.detail.includes('is not present')) {
      return res.status(400).json({ error: 'Henviser til noget, der ikke findes' });
    }
    return res.status(409).json({ error: 'Rækken bruges af noget andet' });
  }
  // Findes allerede (fx en student der allerede er på et course)
  if (err.code === '23505') {
    return res.status(409).json({ error: 'Findes allerede' });
  }

  console.log(err);
  res.status(500).json({ error: 'Uventet serverfejl' });
}
