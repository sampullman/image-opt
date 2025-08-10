import { describe, it, expect } from 'vitest';
import { readExif, writeExif } from '../src/index';

// 1x1 black jpeg with exif data
const jpegWithExifB64 =
  '/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAr/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ACooA//Z';
const jpegWithExif = Buffer.from(jpegWithExifB64, 'base64');

// 1x1 black jpeg without exif data
const jpegWithoutExifB64 =
  '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ACgAKA//2Q==';
const jpegWithoutExif = Buffer.from(jpegWithoutExifB64, 'base64');


describe('copy-exif', () => {
  it('should read and write exif data', () => {
    const exifData = readExif(jpegWithExif.buffer.slice(jpegWithExif.byteOffset, jpegWithExif.byteOffset + jpegWithExif.byteLength));
    expect(exifData).not.toBeNull();

    if (exifData) {
      const newJpeg = writeExif(jpegWithExif.buffer.slice(jpegWithExif.byteOffset, jpegWithExif.byteOffset + jpegWithExif.byteLength), exifData);
      expect(newJpeg).toBeInstanceOf(ArrayBuffer);
      const newExifData = readExif(newJpeg);
      expect(newExifData).toEqual(exifData);
    }
  });

  it('should return null if no exif data is found', () => {
    const exifData = readExif(jpegWithoutExif.buffer.slice(jpegWithoutExif.byteOffset, jpegWithoutExif.byteOffset + jpegWithoutExif.byteLength));
    expect(exifData).toBeNull();
  });
});
