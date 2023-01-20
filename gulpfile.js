var gulp = require('gulp');
var nodemon = require('nodemon');
const { exec } = require('child_process');

gulp.task('start', function (done) {
    exec('npm start ', {
        cwd: 'ReviewsService/',
    }, (error, stdout, stderr) => {
        console.log(stdout)
    });

    exec('npm start ', {
        cwd: 'MapsView/app/',
    }, (error, stdout, stderr) => {
        console.log(stdout)
    });

})

gulp.task('build', async function (done) {
    exec('npm install', {
        cwd: 'Database/'
    }, (error, stdout, stderr) => {
        let logmessage = stdout + "\nDATABASE PACKAGES INSTALLED SUCCESSFULLY" + "\n\n---------------------------------\n";
        console.log(logmessage)
        if (stderr) console.log("Error instaling packages for Database")
    });

    exec('npm install', {
        cwd: 'MapsView/'
    }, (error, stdout, stderr) => {
        let logmessage = stdout + "\nMAPS_VIEW PACKAGES INSTALLED SUCCESSFULLY" + "\n\n---------------------------------\n";
        console.log(logmessage)
        if (stderr) console.log("Error instaling packages for MapsView")
    });

    exec('npm install', {
        cwd: 'ReviewsService/'
    }, (error, stdout, stderr) => {
        let logmessage = stdout + "\nREVIEW_SERVICE PACKAGES INSTALLED SUCCESSFULLY" + "\n\n---------------------------------\n";
        console.log(logmessage)
        if (stderr) console.log("Error instaling packages for ReviewsService")
    });
})


