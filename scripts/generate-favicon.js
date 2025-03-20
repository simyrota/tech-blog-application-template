// このスクリプトはビルド時に実行することで、SVGからPNGとICOファイルを生成できます
// 必要なパッケージ: sharp, to-ico
// npm install --save-dev sharp to-ico

const fs = require("fs")
const path = require("path")
const sharp = require("sharp")
const toIco = require("to-ico")

async function generateFavicons() {
  const sizes = [16, 32, 48, 64, 128, 192, 256, 512]
  const pngBuffers = []

  // SVGからPNGを生成
  for (const size of sizes) {
    const pngBuffer = await sharp(path.join(__dirname, "../public/favicon.svg")).resize(size, size).png().toBuffer()

    // 特定のサイズはファイルとして保存
    if ([192, 512].includes(size)) {
      fs.writeFileSync(path.join(__dirname, `../public/favicon-${size}x${size}.png`), pngBuffer)
    }

    // Apple Touch Icon
    if (size === 180) {
      fs.writeFileSync(path.join(__dirname, "../public/apple-touch-icon.png"), pngBuffer)
    }

    // ICO用にバッファを保存
    if ([16, 32, 48, 64].includes(size)) {
      pngBuffers.push(pngBuffer)
    }
  }

  // ICOファイルを生成
  const icoBuffer = await toIco(pngBuffers)
  fs.writeFileSync(path.join(__dirname, "../public/favicon.ico"), icoBuffer)

  console.log("Favicons generated successfully!")
}

generateFavicons().catch(console.error)

