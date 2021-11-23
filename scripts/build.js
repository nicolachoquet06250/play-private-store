const { copyFile } = require('fs');
const { exec } = require('child_process');

exec('vue-cli-service build', (error, stdout, stderr) => {
    if (error !== null) {
        console.error(stderr)
    } else {
        copyFile('.htaccess', 'dist/.htaccess', err => {
            if (err) {
                console.error(err);
            } else {
                console.log(
                    `==========================================
|== Le projet à été buildé avec succès ==|
==========================================`
                );
            }
        });
    }
});