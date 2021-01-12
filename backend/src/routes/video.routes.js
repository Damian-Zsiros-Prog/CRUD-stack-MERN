const { Router } = require("express");
const dbConnection = require("../database");

const router = Router();

// Get all videos
router.get("/api/videos", (req, res) => {
  const query = "SELECT * FROM video";
  dbConnection.query(query, (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.error(err);
      res.json({
        message: "Error en la consulta SQL. Contacte con el administrador",
      });
      return;
    }
  });
});

// Get one video by Id
router.get("/api/video/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM video WHERE id= ?";
  dbConnection.query(query, [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.error(err);
      res.json({
        message: "Error en la consulta SQL. Contacte con el administrador",
      });
      return;
    }
  });
});
// Creating new video
router.post("/api/videos", (req, res) => {
  const { title, description, link_video } = req.body;
  const query =
    "INSERT INTO video (title,description,link_video) VALUES(?,?,?)";
  dbConnection.query(
    query,
    [title, description, link_video],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          message: "Video saved",
        });
      } else {
        console.error(err);
        res.json({
          message: "Error en la consulta SQL. Contacte con el administrador",
        });
        return;
      }
    }
  );
});
// Updating video
router.put("/api/video/:id", (req, res) => {
  const { title, description, link_video } = req.body;
  const { id } = req.params;
  const query =
    "UPDATE video SET title = ?,description = ?,link_video = ? WHERE id= ?";
  dbConnection.query(
    query,
    [title, description, link_video, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({
          message: "Video updated",
        });
      } else {
        console.error(err);
        res.json({
          message: "Error en la consulta SQL. Contacte con el administrador",
        });
        return;
      }
    }
  );
});

// Updating video
router.delete("/api/video/:id", (req, res) => {
    const { id } = req.params;
    const query =
      "DELETE FROM video WHERE id = ?";
    dbConnection.query(
      query,
      [id],
      (err, rows, fields) => {
        if (!err) {
          res.json({
            message: "Video deleted",
          });
        } else {
          console.error(err);
          res.json({
            message: "Error en la consulta SQL. Contacte con el administrador",
          });
          return;
        }
      }
    );
  });

module.exports = router;
