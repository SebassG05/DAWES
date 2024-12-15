import path from 'path';
import fs from 'fs';

const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send('File uploaded successfully.');
};

const downloadFile = (req, res) => {
  const fileName = req.params.name;
  const filePath = path.join(__dirname, '../files', fileName);

  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).send('File not found.');
  }
};

export { uploadFile, downloadFile };