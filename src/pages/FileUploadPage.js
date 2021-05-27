import { BasePage } from './BasePage';
import { logger } from '../config/logger';

class FileUploadPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = 'css=h3';
    this.uploadFileInput = 'css=input[type=file]';
    this.uploadButton = 'css=input#file-submit';
    this.fileName = 'css=div#uploaded-files';
  }

  async open() {
    logger.debug('Open the File Upload page');
    await super.open('/upload');
  }

  async uploadFile(path) {
    logger.debug(`Upload file from ${path} on the File Upload page`);
    await super.uploadFile(this.uploadFileInput, path);
    logger.debug(`File uploaded on the File Upload page`);
  }

  async clickOnUploadButton() {
    logger.debug('Click on the [Upload] button on the File Upload page');
    await this.page.click(this.uploadButton);
  }

  async getUploadedFileName() {
    const fileName = await this.getElementContent(this.fileName);
    logger.debug(`File Uploaded name is ${fileName}`);
    return fileName;
  }
}

module.exports = {
  FileUploadPage,
};
