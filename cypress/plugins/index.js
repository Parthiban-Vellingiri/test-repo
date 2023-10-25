module.exports = (on, config) => {
    on('task', {
      listFiles: ({ downloadsFolder }) => {
        const fs = require('fs');
        const path = require('path');
        const folderPath = path.join(__dirname, '..', downloadsFolder);
        cy.log(fs.readdirSync(folderPath).map((file) => path.join(downloadsFolder, file)))
        return fs.readdirSync(folderPath).map((file) => path.join(downloadsFolder, file));
      },
      findFilesByTimestamp: ({ downloadsFolder, fileName, timestamp }) => {
        const fs = require('fs');
        const path = require('path');
        const folderPath = path.join(__dirname, '..', downloadsFolder);
  
        return fs.readdirSync(folderPath)
          .filter((file) => {
            const filePath = path.join(downloadsFolder, file);
            const stats = fs.statSync(filePath);
            return file.includes(fileName) && stats.mtime.getTime() === timestamp;
          });
      },
    });
  };
  