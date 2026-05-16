const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SOURCE = path.join(__dirname, "..", "public", "favicon.png");
const OUT_DIR = path.join(__dirname, "..", "public", "icons");
const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error("Source image not found:", SOURCE);
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const size of SIZES) {
    const out = path.join(OUT_DIR, `icon-${size}x${size}.png`);
    await sharp(SOURCE)
      .resize(size, size, { fit: "contain", background: { r: 10, g: 10, b: 10, alpha: 0 } })
      .png()
      .toFile(out);
    console.log(`Generated ${out}`);
  }

  console.log("\nAll icons generated successfully!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
