const gulp = require('gulp');
const nodemon = require('nodemon');
const exec  = require('child_process').exec;

gulp.task('start', function (cb) {
	
    exec('npm start >> logs/log-$(date "+%Y.%m.%d-%H.%M.%S").log', {
        cwd: 'ReviewsService/',
    },function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });

    exec('npm start ', {
        cwd: 'MapsView/app/',
    }, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
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


