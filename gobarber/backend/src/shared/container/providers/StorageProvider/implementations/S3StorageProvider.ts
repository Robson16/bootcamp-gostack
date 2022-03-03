import fs from 'fs';
import path from 'path';
import mime from 'mime';
import aws, { S3 } from 'aws-sdk';

import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  private client: S3;

  private bucket: string | undefined = uploadConfig.config.aws.bucket;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_REGION,
    });
  }

  public async saveFile(file: string): Promise<string> {
    if (!this.bucket) {
      throw new Error('AWS S3 Bucket not set');
    }

    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: this.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    if (!this.bucket) {
      throw new Error('AWS S3 Bucket not set');
    }

    await this.client
      .deleteObject({
        Bucket: this.bucket,
        Key: file,
      })
      .promise();
  }
}

export default DiskStorageProvider;
