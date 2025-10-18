import { execSync } from "child_process";
import { copyFileSync, readdirSync, cpSync } from "fs";

function showError(e) {
    if (e) throw e
}

(() => {
    execSync("esbuild styles.css --bundle --minify --outfile=build/styles.css");
    execSync("esbuild scripts.js --bundle --minify --outfile=build/scripts.js");
    copyFileSync("index.html", "build/index.html");
    cpSync("assets", "build/assets", { recursive: true }, showError)
    
    const files = readdirSync("build", { recursive: true });
    console.log("📁 Arquivos na pasta build:");
    files.forEach(file => console.log(" -", file));

    console.log("✅ Build complete!");
})()

// Run esbuild


// // // Copy HTML
// // 

// // // Copy assets
// // fs.cp("assets", "build/assets", { recursive: true });
