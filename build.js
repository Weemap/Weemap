import { exec, execSync } from "child_process";
import { copyFile, mkdir, rm, rmdir, cp } from "fs";

function showError(e) {
    if (e) throw e
}

(() => {
    exec("esbuild styles.css --bundle --minify --outfile=/build/styles.min.css");
    exec("esbuild scripts.js --bundle --minify --outfile=/build/scripts.min.js");
    copyFile("index.html", "./build/index.html", showError);
    copyFile(".htaccess", "./build/.htaccess", showError);
    cp("assets", "./build/assets", { recursive: true }, showError)

    console.log("✅ Build complete!");
})()

// Run esbuild


// // // Copy HTML
// // 

// // // Copy assets
// // fs.cp("assets", "build/assets", { recursive: true });
