interface CompressImageParams {
  file: File
  maxWidth?: number
  maxHeight?: number
  quality?: number
}

function convertToWebp(filename: string) {
  const fileParts = filename.split('.')
  fileParts.pop()
  return `${fileParts}.webp`
}

export function compressImage({
  file,
  maxWidth = Number.POSITIVE_INFINITY,
  maxHeight = Number.POSITIVE_INFINITY,
  quality = 1,
}: CompressImageParams) {
  const allowedImages = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  if (!allowedImages.includes(file.type)) {
    throw new Error('File type not supported')
  }

  const reader = new FileReader()

  return new Promise<File>((resolve, reject) => {
    reader.onload = event => {
      const compressedImage = new Image()

      compressedImage.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          reject(new Error('Failed to create canvas context'))
          return
        }

        let { width, height } = compressedImage

        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height

          if (width > height) {
            width = maxWidth
            height = maxWidth / aspectRatio
          } else {
            height = maxHeight
            width = maxHeight * aspectRatio
          }
        }

        canvas.width = width
        canvas.height = height

        ctx.drawImage(compressedImage, 0, 0, width, height)

        canvas.toBlob(
          blob => {
            if (!blob) {
              reject(new Error('Failed to compress image'))
              return
            }

            const compressedFile = new File([blob], convertToWebp(file.name), {
              type: 'image/webp',
              lastModified: Date.now(),
            })

            resolve(compressedFile)
          },
          'image/webp',
          quality
        )
      }

      compressedImage.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  })
}
