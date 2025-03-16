import { Readable } from 'node:stream'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { z } from 'zod'

const uploadImageInput = z.object({
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type UploadImageInput = z.input<typeof uploadImageInput>

const allowedContentTypes = [
  'image/jpeg',
  'image/png',
  'image/png',
  'image/webp',
]

export async function uploadImage(input: UploadImageInput) {
  const { contentStream, contentType, fileName } = uploadImageInput.parse(input)

  if (!allowedContentTypes.includes(contentType)) {
    throw new Error('Invalid content type')
  }

  //TODO: load image to cloudflare R2

  await db.insert(schema.uploads).values({
    name: fileName,
    remoteKey: fileName,
    remoteUrl: fileName,
  })
}
