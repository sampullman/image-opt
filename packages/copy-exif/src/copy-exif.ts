/**
 * Copy Exif from one JPEG to another. If dest already has Exif, it is replaced.
 * Otherwise, Exif is inserted after the initial APPn/COM header "prologue".
 *
 * @param srcBlob  Source JPEG Blob to read Exif from
 * @param destBlob Destination JPEG Blob to receive Exif
 * @param opts     { normalizeOrientation?: boolean } - if true, sets Orientation=1
 * @returns        A new JPEG Blob with Exif copied
 */
export default async function copyExif(
  srcBlob: Blob,
  destBlob: Blob,
  opts: { normalizeOrientation?: boolean } = {},
): Promise<Blob> {
  const { normalizeOrientation = false } = opts

  const [srcBuf, destBuf] = await Promise.all([
    srcBlob.arrayBuffer(),
    destBlob.arrayBuffer(),
  ])

  if (!isJpegSOI(srcBuf)) throw new Error('Source is not a valid JPEG')
  if (!isJpegSOI(destBuf)) throw new Error('Destination is not a valid JPEG')

  const exifSegment = extractExifSegment(srcBuf, { normalizeOrientation })
  // If no Exif in src, just return dest as-is.
  if (!exifSegment) return destBlob

  const { insertAt, replaceStart, replaceEnd } = analyzeDestHeader(destBuf)

  // Build new JPEG with replacement or insertion.
  const head =
    replaceStart >= 0 ? destBlob.slice(0, replaceStart) : destBlob.slice(0, insertAt)
  const tail = replaceStart >= 0 ? destBlob.slice(replaceEnd) : destBlob.slice(insertAt)

  return new Blob([head, exifSegment, tail], {
    type: destBlob.type || 'image/jpeg',
  })
}

/* ========================= Internals ========================= */

const SOI = 0xffd8 // Start Of Image
const SOS = 0xffda // Start Of Scan
const APP1 = 0xffe1 // APP1 marker
const APP0_MIN = 0xffe0 // APPn range start
const APP15_MAX = 0xffef // APPn range end
const COM = 0xfffe // Comment
const EXIF_MAGIC = 0x45786966 // "Exif" as big-endian uint32

function isJpegSOI(buf: ArrayBuffer): boolean {
  if (buf.byteLength < 2) return false
  const v = new DataView(buf)
  return v.getUint16(0, false) === SOI
}

/**
 * Extracts the full APP1 Exif segment (marker + length + payload) from srcBuf.
 * Optionally normalizes Orientation=1 inside the Exif TIFF if present.
 * Returns null if no Exif segment is found.
 */
function extractExifSegment(
  srcBuf: ArrayBuffer,
  { normalizeOrientation }: { normalizeOrientation: boolean },
): ArrayBuffer | null {
  const v = new DataView(srcBuf)
  let o = 2 // start after SOI

  while (o + 4 <= v.byteLength) {
    const marker = v.getUint16(o, false)
    if (marker === SOS) break

    // All pre-SOS segments have a 2-byte length (includes those 2 bytes).
    const size = v.getUint16(o + 2, false)
    if (size < 2) break
    const next = o + 2 + size
    if (next > v.byteLength) break

    if (marker === APP1) {
      // Verify "Exif\0\0"
      if (
        o + 10 <= v.byteLength && // need at least marker(2)+len(2)+magic(6)
        v.getUint32(o + 4, false) === EXIF_MAGIC &&
        v.getUint16(o + 8, false) === 0x0000
      ) {
        if (normalizeOrientation) {
          tryNormalizeOrientationInPlace(v, o, size)
        }
        // Return the full segment [marker + length + payload]
        return srcBuf.slice(o, next)
      }
    }

    o = next
  }

  return null
}

/**
 * If possible, rewrite Orientation tag to 1 inside the Exif TIFF.
 * Safe-guards ensure no OOB. Only handles the common case: SHORT count=1 stored inline.
 */
function tryNormalizeOrientationInPlace(v: DataView, segOffset: number, segSize: number) {
  // seg layout: [APP1 marker(2)][len(2)][ "Exif"(4) ][00 00][TIFF...]
  const tiffOffset = segOffset + 10
  if (tiffOffset + 8 > v.byteLength) return

  const endian = v.getUint16(tiffOffset, false)
  const le = endian === 0x4949 ? true : endian === 0x4d4d ? false : null
  if (le === null) return

  const version = v.getUint16(tiffOffset + 2, le)
  if (version !== 0x002a) return

  const ifd0Rel = v.getUint32(tiffOffset + 4, le)
  const ifd0 = tiffOffset + ifd0Rel
  if (ifd0 + 2 > v.byteLength) return

  const numEntries = v.getUint16(ifd0, le)
  let p = ifd0 + 2
  const end = p + numEntries * 12
  if (end > v.byteLength) return

  for (; p + 12 <= end; p += 12) {
    const tag = v.getUint16(p, le)
    if (tag !== 0x0112) continue // Orientation
    const type = v.getUint16(p + 2, le)
    const count = v.getUint32(p + 4, le)

    // Only handle SHORT (3), count=1 stored inline
    if (type === 3 && count === 1) {
      v.setUint16(p + 8, 1, le) // set Orientation=1 (upright)
    }
    break
  }
}

/**
 * Analyze destination header to find:
 *  - insertAt: where to insert a new Exif (after initial APPn/COM prologue)
 *  - replaceStart/replaceEnd: byte range of existing Exif APP1 (if any)
 */
function analyzeDestHeader(destBuf: ArrayBuffer): {
  insertAt: number
  replaceStart: number
  replaceEnd: number
} {
  const v = new DataView(destBuf)
  let o = 2 // after SOI
  let insertAt = 2
  let prologueOpen = true
  let replaceStart = -1
  let replaceEnd = -1

  while (o + 4 <= v.byteLength) {
    const marker = v.getUint16(o, false)
    if (marker === SOS) break

    const size = v.getUint16(o + 2, false)
    if (size < 2) break
    const next = o + 2 + size
    if (next > v.byteLength) break

    // Track the "prologue" (initial contiguous APPn/COM segments)
    if (prologueOpen) {
      if ((marker >= APP0_MIN && marker <= APP15_MAX) || marker === COM) {
        insertAt = next
      } else {
        prologueOpen = false
      }
    }

    // Locate existing Exif APP1 to replace
    if (
      marker === APP1 &&
      o + 10 <= v.byteLength &&
      v.getUint32(o + 4, false) === EXIF_MAGIC &&
      v.getUint16(o + 8, false) === 0x0000
    ) {
      replaceStart = o
      replaceEnd = next
      // continue scanning in case there are multiple; we’ll replace the first found (common practice)
      // If you prefer replacing the *last*, just don’t update after first hit.
    }

    o = next
  }

  return { insertAt, replaceStart, replaceEnd }
}
