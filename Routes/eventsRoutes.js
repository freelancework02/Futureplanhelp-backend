// // routes/eventsRoutes.js
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');

// // multer: memory storage, 8MB per file, up to 50 files per field
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 8 * 1024 * 1024, files: 50 }
// });

// // require controller
// const ctrl = require('../Controller/eventsController');

// // -----------------------------
// // Literal / static routes
// // -----------------------------

// // Add single image to an event
// router.post('/image', upload.single('image'), ctrl.createImage);
// router.get('/image/:imageId/blob', ctrl.getImageBlob);
// router.delete('/image/:imageId', ctrl.deleteImage);

// // Get previous events (status = 0)
// router.get('/previous', ctrl.listPreviousEvents);

// // List only active events (status = 1)
// router.get('/', ctrl.listEvents);

// // Create event with images upload
// router.post('/', upload.fields([
//   { name: 'images', maxCount: 50 },
//   { name: 'images[]', maxCount: 50 }
// ]), ctrl.createEvent);

// // Archive event: set status = 0
// router.put('/:id/archive', ctrl.archiveEvent);

// // -----------------------------
// // Numeric ID-based routes
// // -----------------------------
// router.get('/:id', ctrl.getEvent);

// router.put('/:id', upload.fields([
//   { name: 'images', maxCount: 50 },
//   { name: 'images[]', maxCount: 50 }
// ]), ctrl.updateEvent);

// router.delete('/:id', ctrl.deleteEvent);

// module.exports = router;








// routes/eventsRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');

// multer: memory storage, 8MB per file, up to 50 files per field
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 50 }
});

// controller
const ctrl = require('../Controller/eventsController');

// -----------------------------
// Static Routes
// -----------------------------

// Create event with images upload
router.post('/', upload.fields([
  { name: 'images', maxCount: 50 },
  { name: 'images[]', maxCount: 50 }
]), ctrl.createEvent);

// Get ALL events (active + archived)
router.get('/all', ctrl.listAllEvents);

// Get previous events (status = 0 - archived)
router.get('/previous', ctrl.listPreviousEvents);

// List only active events (status = 1)
router.get('/', ctrl.listEvents);

// Add single image to an event
router.post('/image', upload.single('image'), ctrl.createImage);

// Get image blob
router.get('/image/:imageId/blob', ctrl.getImageBlob);

// Delete a single image
router.delete('/image/:imageId', ctrl.deleteImage);

// Archive event: set status = 0
router.put('/:id/archive', ctrl.archiveEvent);

// -----------------------------
// Numeric ID Routes
// -----------------------------

// Get single event
router.get('/:id', ctrl.getEvent);

// Update event with images
router.put('/:id', upload.fields([
  { name: 'images', maxCount: 50 },
  { name: 'images[]', maxCount: 50 }
]), ctrl.updateEvent);

// Delete event
router.delete('/:id', ctrl.deleteEvent);

module.exports = router;
