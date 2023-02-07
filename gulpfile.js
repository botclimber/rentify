var gulp = require('gulp');
var nodemon = require('nodemon');
const { exec } = require('child_process');

gulp.task('start', function (done) {
    exec('npm start', {
        cwd: 'Services/Review',
    }, (error, stdout, stderr) => {
        console.log(stdout)
    });

    exec('npm start', {
        cwd: 'Views/Maps/app/',
    }, (error, stdout, stderr) => {
        console.log(stdout)
    });

    exec('npm start', {
        cwd: 'Services/Users',
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
        cwd: 'Views/Maps'
    }, (error, stdout, stderr) => {
        let logmessage = stdout + "\nMAPS_VIEW PACKAGES INSTALLED SUCCESSFULLY" + "\n\n---------------------------------\n";
        console.log(logmessage)
        if (stderr) console.log("Error instaling packages for MapsView")
    });

    exec('npm install', {
        cwd: 'Services/Reviews'
    }, (error, stdout, stderr) => {
        let logmessage = stdout + "\nREVIEW SERVICE PACKAGES INSTALLED SUCCESSFULLY" + "\n\n---------------------------------\n";
        console.log(logmessage)
        if (stderr) console.log("Error instaling packages for REVIEW SERVICE")
    });

    exec('npm install', {
        cwd: 'Services/Users'
    }, (error, stdout, stderr) => {
        let logmessage = stdout + "\nUSER SERVICE PACKAGES INSTALLED SUCCESSFULLY" + "\n\n---------------------------------\n";
        console.log(logmessage)
        if (stderr) console.log("Error instaling packages for USER SERVICE")
    });
})


