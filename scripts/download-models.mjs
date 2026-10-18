import fs from "fs";
import path from "path";
import https from "https";

const MODELS = [
  {
    name: "female-avatar.glb",
    url: "https://raw.githubusercontent.com/met4citizen/TalkingHead/master/avatars/brunette.glb",
  },
  {
    name: "male-avatar.glb",
    url: "https://raw.githubusercontent.com/met4citizen/TalkingHead/master/avatars/avaturn.glb",
  },
];

const targetDir = path.resolve(process.cwd(), "public", "models");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: HTTP ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve();
      });
    }).on("error", reject);
  });
}

async function main() {
  console.log("Checking and downloading 3D Avatar GLB assets...");
  for (const model of MODELS) {
    const dest = path.join(targetDir, model.name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 100000) {
      console.log(`[OK] ${model.name} already exists (${(fs.statSync(dest).size / 1024 / 1024).toFixed(2)} MB).`);
      continue;
    }
    console.log(`Downloading ${model.name} from ${model.url}...`);
    try {
      await download(model.url, dest);
      console.log(`[SUCCESS] Saved ${model.name} (${(fs.statSync(dest).size / 1024 / 1024).toFixed(2)} MB)`);
    } catch (err) {
      console.error(`[ERROR] Could not download ${model.name}:`, err.message);
    }
  }
}

main();
