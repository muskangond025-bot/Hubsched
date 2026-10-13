const sharp = require("sharp");

async function main() {
  const meta = await sharp("public/cylinder-fashion-ref.png").metadata();
  console.log("Metadata:", meta);

  // Crop the card region: from x=320, y=75, width=470, height=270
  await sharp("public/cylinder-fashion-ref.png")
    .extract({ left: 325, top: 78, width: 470, height: 275 })
    .toFile("public/card-fashion-exact.png");
  console.log("Cropped card to public/card-fashion-exact.png");
}

main().catch(console.error);
