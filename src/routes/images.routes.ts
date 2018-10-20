import * as express from 'express'
import * as multer from 'multer'
import { safeRoute } from '../utils/routes.util'

const _uploader = multer({ storage: multer.memoryStorage() }).single('file')

export const createImagesRoutes = (cloudinary, uploader = _uploader) => {
  const routes = express.Router()

  routes.post(
    '/',
    uploader,
    safeRoute(async (req, res) => {
      const { file }: { file: Express.Multer.File } = req
      try {
        const result = await cloudinary.uploadToCloudinary(file.buffer)
        res.json({ id: result.public_id, url: result.secure_url })
      } catch (err) {
        throw { status: err.http_code, message: err.message }
      }
    })
  )

  routes.delete(
    '/:id',
    safeRoute(async (req, res) => {
      const { params } = req
      try {
        await cloudinary.removeFromCloudinary(params.id)
        res.status(200).send()
      } catch (err) {
        throw { status: err.http_code, message: err.message }
      }
    })
  )

  return routes
}
