var gulp   = require('gulp');
var gutil  = require('gulp-util');
var argv   = require('minimist')(process.argv);
var gulpif = require('gulp-if');
var prompt = require('gulp-prompt');
var rsync  = require('gulp-rsync');
var watch = require('gulp-watch');
gulp.task('deploy', function() {
  rsyncPaths = ['source'];

  // Default options for rsync
  rsyncConf = {
    progress: true,
    incremental: true,
    relative: true,
    emptyDirectories: true,
    recursive: true,
    clean: true,
    exclude: [],
  };
  
  // Staging
  if (argv.staging) {
    
    rsyncConf.hostname = 'raspberrypi'; // hostname
    rsyncConf.username = 'pi'; // ssh username
    rsyncConf.destination = '~/dist/'; // path where uploaded files go
    
  // Production
  } else if (argv.production) {

    rsyncConf.hostname = ''; // hostname
    rsyncConf.username = ''; // ssh username
    rsyncConf.destination = ''; // path where uploaded files go
    
  
  // Missing/Invalid Target  
  } else {
    throwError('deploy', gutil.colors.red('Missing or invalid target'));
  }
  

  // Use gulp-rsync to sync the files 
  return gulp.src(rsyncPaths)
  .pipe(gulpif(
      argv.production, 
      prompt.confirm({
        message: 'Heads Up! Are you SURE you want to push to PRODUCTION?',
        default: false
      })
  ))
  .pipe(rsync(rsyncConf));

});


function throwError(taskName, msg) {
  throw new gutil.PluginError({
      plugin: taskName,
      message: msg
    });
}

gulp.task('watch', function () {
    // Endless stream mode 
    gulp.watch('source/*', console.log("Going to deploy now."));
});