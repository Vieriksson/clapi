import * as cloudinary from 'cloudinary'

type CloudinaryResponse = {
  public_id: string
  secure_url: string
}

const uploadToCloudinary = async (buffer: Buffer) =>
  new Promise<CloudinaryResponse>((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream((err, res: CloudinaryResponse) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
      .end(buffer)
  })

const removeFromCloudinary = async (id: string) =>
  new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(id, (err, res: CloudinaryResponse) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })

export const cloudinaryClient = {
  uploadToCloudinary,
  removeFromCloudinary
}
